# Spring MVC और Hibernate - Complete Details

## 📋 **Overview**
यह document बताता है कि इस project में **Spring MVC** और **Hibernate** कैसे use किए गए हैं, उनकी versions, और implementation details।

---

## 🎯 **1. SPRING MVC - Version और Usage**

### **Version:**
- **Spring Boot Version:** `3.1.4`
- **Spring MVC:** Spring Boot 3.1.4 के साथ automatically included है
- **Spring Framework Version:** `6.0.x` (Spring Boot 3.1.4 के साथ)

### **क्यों Use किया:**
Spring MVC use किया है **RESTful API** बनाने के लिए:

1. **REST API Endpoints** - Frontend के साथ communicate करने के लिए
2. **HTTP Request Handling** - GET, POST, PUT, DELETE requests handle करने के लिए
3. **JSON Response** - Data को JSON format में return करने के लिए
4. **Request Mapping** - Different URLs को different methods से map करने के लिए
5. **Cross-Origin Support** - Frontend से requests allow करने के लिए (CORS)

### **Dependency (pom.xml):**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

**क्या Include होता है:**
- Spring MVC framework
- Embedded Tomcat server
- Jackson (JSON processing)
- Spring Web (REST support)

---

## 🎯 **2. HIBERNA`TE - Version और Usage**

### **Version:**
- **Hibernate Version:** `6.2.x` (Spring Boot 3.1.4 के साथ automatically included)
- **JPA Version:** `3.1` (Jakarta Persistence API)

### **क्यों Use किया:**
Hibernate use किया है **Database Operations** के लिए:

1. **ORM (Object-Relational Mapping)** - Java objects को database tables से map करने के लिए
2. **Automatic SQL Generation** - Manual SQL queries लिखने की जरूरत नहीं
3. **Relationship Management** - Tables के बीच relationships handle करने के लिए
4. **Transaction Management** - Database transactions automatically manage होती हैं
5. **DDL Auto-generation** - Tables automatically create/update होती हैं

### **Dependency (pom.xml):**
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

**क्या Include होता है:**
- Hibernate ORM framework
- Spring Data JPA
- HikariCP (Connection Pooling)
- Transaction support

---

## 🎯 **3. DATABASE - क्या Use किया**

### **Database: MySQL**
- **Database Name:** `caretrack`
- **MySQL Connector:** `com.mysql.cj.jdbc.Driver`
- **Port:** `3306`
- **Username:** `root`
- **Password:** `cdac`

### **Database Configuration (application.properties):**
```properties
# DB CONFIG - Using MySQL database
spring.datasource.url=jdbc:mysql://localhost:3306/caretrack?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=cdac
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA CONFIG (Hibernate Settings)
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

### **MySQL Connector Dependency:**
```xml
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
```

---

## 🎯 **4. SPRING MVC कैसे Apply किया**

### **A. Controller Classes में:**

**Example: PetController.java**
```java
@RestController                    // Spring MVC annotation
@RequestMapping("/api/pets")      // Base URL path
@CrossOrigin(origins = "*")        // CORS support
public class PetController {

    @Autowired
    private PetService petService;

    // GET Request - सभी pets fetch करना
    @GetMapping
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    // GET Request - Specific pet by ID
    @GetMapping("/{id}")
    public Pet getPetById(@PathVariable Long id) {
        return petService.getPetById(id);
    }

    // POST Request - नया pet create करना
    @PostMapping
    public ResponseEntity<?> createPet(@RequestParam String petName, ...) {
        // Pet creation logic
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
    }

    // PUT Request - Pet update करना
    @PutMapping("/{id}")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        return petService.updatePet(id, pet);
    }

    // DELETE Request - Pet delete करना
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Long id) {
        petService.deletePet(id);
        return ResponseEntity.ok(Map.of("message", "Pet deleted successfully"));
    }
}
```

### **B. Spring MVC Annotations Used:**

1. **@RestController** - Class को REST controller बनाता है
2. **@RequestMapping** - Base URL path define करता है
3. **@GetMapping** - HTTP GET requests handle करता है
4. **@PostMapping** - HTTP POST requests handle करता है
5. **@PutMapping** - HTTP PUT requests handle करता है
6. **@DeleteMapping** - HTTP DELETE requests handle करता है
7. **@PathVariable** - URL से variable extract करता है (`/{id}`)
8. **@RequestParam** - Query parameters या form data extract करता है
9. **@RequestBody** - JSON data को Java object में convert करता है
10. **@CrossOrigin** - CORS (Cross-Origin Resource Sharing) enable करता है

### **C. Request Flow:**

```
Frontend Request → Spring MVC Controller → Service Layer → Repository (Hibernate) → Database
                    ↓
                JSON Response ← Spring MVC automatically converts to JSON
```

---

## 🎯 **5. HIBERNATE कैसे Apply किया**

### **A. Entity Classes में:**

**Example: Pet.java**
```java
@Entity                                    // Hibernate annotation - class को table बनाता है
public class Pet {

    @Id                                    // Primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Long id;

    private String petName;
    private String species;
    private String breed;
    private int age;
    private boolean adopted;

    @Column(length = 1000)                 // Column properties
    private String photoUrls;

    @ManyToOne                            // Relationship - Many pets to One shelter
    @JoinColumn(name = "shelter_id")      // Foreign key column name
    @JsonBackReference
    private Shelter shelter;

    // Getters and Setters
}
```

### **B. Repository Interface में:**

**Example: PetRepository.java**
```java
public interface PetRepository extends JpaRepository<Pet, Long> {
    // JpaRepository internally Hibernate use करता है

    // Custom query methods - Hibernate automatically SQL generate करता है
    List<Pet> findByShelterId(Long shelterId);
    List<Pet> findByAdoptedFalse();
}
```

**क्या होता है:**
- `JpaRepository<Pet, Long>` - Pet entity के लिए repository
- `findAll()` - `SELECT * FROM pet` query automatically generate होती है
- `save()` - `INSERT` या `UPDATE` query automatically execute होती है
- `findById()` - `SELECT * FROM pet WHERE id = ?` query generate होती है
- `deleteById()` - `DELETE FROM pet WHERE id = ?` query execute होती है

### **C. Service Layer में Use:**

**Example: PetServiceImpl.java**
```java
@Service
public class PetServiceImpl implements PetService {

    @Autowired
    private PetRepository petRepository;  // Hibernate repository

    @Override
    public List<Pet> getAllPets() {
        // Hibernate automatically SQL query generate करता है
        return petRepository.findAll();  // SELECT * FROM pet
    }

    @Override
    public Pet createPet(Pet pet) {
        // Hibernate automatically INSERT query execute करता है
        return petRepository.save(pet);  // INSERT INTO pet ...
    }

    @Override
    public Pet updatePet(Long id, Pet pet) {
        Optional<Pet> existingPetOpt = petRepository.findById(id);
        if (existingPetOpt.isPresent()) {
            Pet existingPet = existingPetOpt.get();
            // Update fields
            existingPet.setPetName(pet.getPetName());
            // ...
            // Hibernate automatically UPDATE query execute करता है
            return petRepository.save(existingPet);  // UPDATE pet SET ...
        }
        return null;
    }

    @Override
    public void deletePet(Long id) {
        // Hibernate automatically DELETE query execute करता है
        petRepository.deleteById(id);  // DELETE FROM pet WHERE id = ?
    }
}
```

### **D. Hibernate Annotations Used:**

1. **@Entity** - Class को database table बनाता है
2. **@Table** - Custom table name specify करता है
3. **@Id** - Primary key define करता है
4. **@GeneratedValue** - Auto-increment ID generate करता है
5. **@Column** - Column properties define करता है (length, nullable, etc.)
6. **@ManyToOne** - Many-to-One relationship define करता है
7. **@OneToMany** - One-to-Many relationship define करता है
8. **@JoinColumn** - Foreign key column name specify करता है
9. **@PrePersist** - Save से पहले execute होने वाला method
10. **@PreUpdate** - Update से पहले execute होने वाला method

### **E. Hibernate Configuration:**

**application.properties में:**
```properties
# Hibernate DDL Auto-generation
spring.jpa.hibernate.ddl-auto=update
# Options: none, validate, update, create, create-drop
# update = Tables automatically create/update होती हैं

# Show SQL queries in console (for debugging)
spring.jpa.show-sql=true

# MySQL Dialect (Hibernate को बताता है कि MySQL use हो रहा है)
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

---

## 🎯 **6. Complete Flow Example**

### **Example: Pet Create करना**

**1. Frontend Request:**
```javascript
POST /api/pets
Content-Type: multipart/form-data
{
  petName: "Buddy",
  species: "Dog",
  breed: "Golden Retriever",
  age: 2,
  shelterId: 1
}
```

**2. Spring MVC Controller:**
```java
@PostMapping
public ResponseEntity<?> createPet(@RequestParam String petName, ...) {
    Pet pet = new Pet();
    pet.setPetName(petName);
    // ...
    Pet savedPet = petService.createPet(pet);  // Service call
    return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
}
```

**3. Service Layer:**
```java
public Pet createPet(Pet pet) {
    return petRepository.save(pet);  // Repository call
}
```

**4. Hibernate (Repository):**
```java
// Hibernate automatically generates and executes:
// INSERT INTO pet (pet_name, species, breed, age, adopted, shelter_id)
// VALUES (?, ?, ?, ?, ?, ?)
```

**5. Database:**
- MySQL में `pet` table में नया record insert होता है

**6. Response:**
```json
{
  "id": 1,
  "petName": "Buddy",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 2,
  "adopted": false
}
```

---

## 🎯 **7. Summary**

### **Spring MVC:**
- ✅ **Version:** Spring Boot 3.1.4 (Spring MVC 6.0.x)
- ✅ **Use किया:** RESTful API endpoints बनाने के लिए
- ✅ **Apply किया:** `@RestController`, `@GetMapping`, `@PostMapping` annotations से

### **Hibernate:**
- ✅ **Version:** Hibernate 6.2.x (Spring Boot 3.1.4 के साथ)
- ✅ **Use किया:** Database operations (ORM) के लिए
- ✅ **Apply किया:** `@Entity`, `@Repository`, `JpaRepository` से

### **Database:**
- ✅ **Type:** MySQL
- ✅ **Name:** caretrack
- ✅ **Connector:** mysql-connector-j

### **Complete Stack:**
```
Frontend (React)
    ↓ HTTP Requests
Spring MVC (REST Controllers)
    ↓ Service Calls
Service Layer
    ↓ Repository Calls
Hibernate (JPA Repository)
    ↓ SQL Queries
MySQL Database
```

---

## 📝 **Interview में कैसे बताएं:**

> "मैंने **Spring MVC** और **Hibernate** use किए हैं Spring Boot 3.1.4 के साथ:
>
> **Spring MVC:**
> - `spring-boot-starter-web` dependency से RESTful API बनाई है
> - `@RestController` और `@GetMapping/@PostMapping` annotations से endpoints define किए हैं
> - JSON responses automatically handle होती हैं
>
> **Hibernate:**
> - `spring-boot-starter-data-jpa` dependency से Hibernate include किया है
> - `@Entity` annotations से Java classes को database tables map किया है
> - `JpaRepository` interface extend करके database operations implement किए हैं
> - Hibernate automatically SQL queries generate करता है
>
> **Database:**
> - MySQL database (`caretrack`) use किया है
> - `application.properties` में connection details configure किए हैं
> - Hibernate DDL auto-generation (`ddl-auto=update`) से tables automatically create होती हैं"

---

**Date:** February 2, 2026
**Project:** Pet Adoption System
