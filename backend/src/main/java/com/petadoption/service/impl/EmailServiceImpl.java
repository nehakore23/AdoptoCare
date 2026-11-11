package com.petadoption.service.impl;

import com.petadoption.model.User;
import com.petadoption.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendWelcomeEmail(User user) {
        System.out.println("[DEBUG] Attempting to send welcome email to: " + user.getEmail());
        System.out.println("[DEBUG] From email: " + fromEmail);

        String subject = "Welcome to Pet Adoption Platform! 🐾";
        String content = buildWelcomeEmailContent(user);
        sendEmail(user.getEmail(), subject, content);
    }

    @Override
    public void sendEmail(String to, String subject, String content) {
        try {
            System.out.println("[DEBUG] Creating email message...");
            System.out.println("[DEBUG] To: " + to);
            System.out.println("[DEBUG] Subject: " + subject);
            System.out.println("[DEBUG] From: " + fromEmail);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject(subject);
            message.setText(content);

            System.out.println("[DEBUG] Sending email...");
            mailSender.send(message);
            System.out.println("[DEBUG] ✅ Welcome email sent successfully to: " + to);
        } catch (Exception e) {
            System.err.println("[ERROR] ❌ Failed to send welcome email to: " + to);
            System.err.println("[ERROR] Error details: " + e.getMessage());
            System.err.println("[ERROR] Error type: " + e.getClass().getSimpleName());
            e.printStackTrace();

            // Additional debugging for common issues
            if (e.getMessage().contains("Authentication")) {
                System.err.println("[ERROR] 🔐 Authentication failed. Check your Gmail app password.");
            } else if (e.getMessage().contains("Connection")) {
                System.err.println("[ERROR] 🌐 Connection failed. Check your internet connection.");
            } else if (e.getMessage().contains("Invalid")) {
                System.err.println("[ERROR] 📧 Invalid email configuration. Check your application.properties.");
            }
        }
    }

    private String buildWelcomeEmailContent(User user) {
        return String.format(
            "Dear %s,\n\n" +
            "🎉 Welcome to our Pet Adoption Platform! 🎉\n\n" +
            "We're thrilled to have you join our community of pet lovers and caregivers. " +
            "Your account has been successfully created with the following details:\n\n" +
            "📧 Email: %s\n" +
            "👤 Username: %s\n" +
            "🏷️ Role: %s\n\n" +
            "What you can do now:\n" +
            "• Browse available pets for adoption\n" +
            "• Submit adoption applications\n" +
            "• Connect with shelters and veterinarians\n" +
            "• Stay updated with announcements\n\n" +
            "If you have any questions or need assistance, please don't hesitate to contact our support team.\n\n" +
            "Thank you for choosing our platform to help pets find their forever homes! 🐕🐱\n\n" +
            "Best regards,\n" +
            "The Pet Adoption Team",
            user.getFullName() != null ? user.getFullName() : user.getUsername(),
            user.getEmail(),
            user.getUsername(),
            user.getRole()
        );
    }

    @Override
    public void sendPasswordResetEmail(String email, String currentPassword) {
        System.out.println("[DEBUG] Attempting to send current password email to: " + email);
        System.out.println("[DEBUG] Current password: " + currentPassword);

        String subject = "Your Password - Pet Adoption Platform 🔐";
        String content = buildCurrentPasswordEmailContent(email, currentPassword);
        sendEmail(email, subject, content);
    }

    private String buildCurrentPasswordEmailContent(String email, String currentPassword) {
        return String.format(
            "Dear User,\n\n" +
            "🔐 Your Original Password\n\n" +
            "We received a request to retrieve your original password for your Pet Adoption Platform account.\n\n" +
            "📧 Email: %s\n" +
            "🔑 Your Original Password: %s\n\n" +
            "⚠️ Important Security Notes:\n" +
            "• This is your original password (decrypted from secure storage)\n" +
            "• Keep your password secure and don't share it with anyone\n" +
            "• If you didn't request this, please contact support immediately\n" +
            "• Consider changing your password for better security\n" +
            "• Use a strong password for better protection\n\n" +
            "🔗 Login Link: http://localhost:3000/login\n\n" +
            "If you have any questions or need assistance, please contact our support team.\n\n" +
            "Thank you for using our Pet Adoption Platform! 🐾\n\n" +
            "Best regards,\n" +
            "The Pet Adoption Team\n\n" +
            "P.S. For security reasons, consider changing your password regularly.",
            email,
            currentPassword
        );
    }
}
