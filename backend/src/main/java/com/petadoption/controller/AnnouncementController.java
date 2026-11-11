package com.petadoption.controller;

import com.petadoption.model.Announcement;
import com.petadoption.model.User;
import com.petadoption.service.AnnouncementService;
import com.petadoption.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/announcements")
@CrossOrigin(origins = "*")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @Autowired
    private UserService userService;


    @GetMapping("/public")
    public ResponseEntity<List<Announcement>> getActiveAnnouncements() {
        List<Announcement> announcements = announcementService.getActiveAnnouncements();
        return ResponseEntity.ok(announcements);
    }


    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Long id) {
        Announcement announcement = announcementService.getAnnouncementById(id);
        if (announcement != null) {
            return ResponseEntity.ok(announcement);
        }
        return ResponseEntity.notFound().build();
    }


    @PostMapping
    public ResponseEntity<?> createAnnouncement(@RequestBody Announcement announcement) {
        try {
            System.out.println("[DEBUG] ===== CREATE ANNOUNCEMENT CALLED =====");
            System.out.println("[DEBUG] Announcement data: " + announcement);



            System.out.println("[DEBUG] Skipping user authentication for now");


            Announcement createdAnnouncement = announcementService.createAnnouncement(announcement);
            System.out.println("[DEBUG] Created announcement: " + createdAnnouncement);
            return ResponseEntity.ok(createdAnnouncement);
        } catch (Exception e) {
            System.out.println("[DEBUG] Exception occurred: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create announcement: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateAnnouncement(@PathVariable Long id, @RequestBody Announcement announcementDetails) {
        try {
            Announcement updatedAnnouncement = announcementService.updateAnnouncement(id, announcementDetails);
            if (updatedAnnouncement != null) {
                return ResponseEntity.ok(updatedAnnouncement);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to update announcement: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable Long id) {
        try {
            announcementService.deleteAnnouncement(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Announcement deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to delete announcement: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }


    @PutMapping("/{id}/toggle")
    public ResponseEntity<?> toggleAnnouncementStatus(@PathVariable Long id) {
        try {
            announcementService.toggleAnnouncementStatus(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Announcement status toggled successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to toggle announcement status: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
