# Spring Boot Annotations Documentation - Pet Adoption Project

## 📋 **Overview**
यह document project में use किए गए सभी annotations की complete list है, उनके descriptions और उपयोग के साथ।

---

## 🎯 **1. SPRING BOOT CORE ANNOTATIONS**

### **@SpringBootApplication**
**Location:** `PetAdoptionApplication.java`
```java
@SpringBootApplication
public class PetAdoptionApplication {
    public static void main(String[] args) {
        SpringApplication.run(PetAdoptionApplication.class, args);
    }
}
```

**क्या होता है:**
- यह Spring Boot application का main entry point है
- यह तीन annotations को combine करता है:
  - `@Configuration` - Class को configuration class बनाता है
  - `@EnableAutoConfiguration` - Auto-configuration enable करता है
  - `@ComponentScan` - Components को scan करता है

**Interview में कैसे बताएं:**
> "मैंने `@SpringBootApplication` annotation use किया है main class में। यह Spring Boot application को start करने के लिए entry point है और automatically सभी configurations और components को scan करता है।"

---

## 🎯 **2. SPRING MVC / REST CONTROLLER ANNOTATIONS**

### **@RestController**
**Location:** सभी Controller classes में
```java
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    // ...
}
```

**क्या होता है:**
- Class को REST controller बनाता है
- सभी methods automatically JSON/XML response return करती हैं
- `@Controller` + `@ResponseBody` का combination है

**Interview में कैसे बताएं:**
> "मैंने `@RestController` use किया है सभी API controllers में। यह Spring को बताता है कि यह class REST API endpoints handle करेगी और responses automatically JSON format में return होंगी।"

---

### **@RequestMapping**
**Location:** Controller classes में
```java
@RequestMapping("/api/auth")
public class AuthController {
    // ...
}
```

**क्या होता है:**
- Base URL path define करता है
- Class level पर use होता है
- सभी methods इस path के under आती हैं

**Example:**
- `@RequestMapping("/api/auth")` + `@PostMapping("/login")` = `/api/auth/login`

**Interview में कैसे बताएं:**
> "`@RequestMapping` से मैंने base URL path define किया है। जैसे `/api/auth` base path है, तो सभी endpoints इसके under आते हैं।"

---

### **@GetMapping**
**Location:** Controller methods में
```java
@GetMapping
public List<Pet> getAllPets() {
    return petService.getAllPets();
}

@GetMapping("/{id}")
public Pet getPetById(@PathVariable Long id) {
    return petService.getPetById(id);
}
```

**क्या होता है:**
- HTTP GET request को handle करता है
- Data fetch करने के लिए use होता है
- `@RequestMapping(method = RequestMethod.GET)` का shortcut है

**Interview में कैसे बताएं:**
> "`@GetMapping` से मैंने GET requests handle की हैं - जैसे सभी pets fetch करना, specific pet by ID fetch करना।"

---

### **@PostMapping**
**Location:** Controller methods में
```java
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
    return authService.register(request);
}
```

**क्या होता है:**
- HTTP POST request को handle करता है
- Data create करने के लिए use होता है
- Request body से data receive करता है

**Interview में कैसे बताएं:**
> "`@PostMapping` से मैंने POST requests handle की हैं - जैसे user registration, pet creation, adoption request submission।"

---

### **@PutMapping**
**Location:** Controller methods में
```java
@PutMapping("/{id}")
public Pet updatePet(@PathVariable Long id, @RequestBody Pet pet) {
    return petService.updatePet(id, pet);
}
```

**क्या होता है:**
- HTTP PUT request को handle करता है
- Data update करने के लिए use होता है
- Existing resource को modify करता है

**Interview में कैसे बताएं:**
> "`@PutMapping` से मैंने update operations handle किए हैं - जैसे pet details update करना, user information update करना।"

---

### **@DeleteMapping**
**Location:** Controller methods में
```java
@DeleteMapping("/{id}")
public ResponseEntity<?> deletePet(@PathVariable Long id) {
    petService.deletePet(id);
    return ResponseEntity.ok("Pet deleted successfully");
}
```

**क्या होता है:**
- HTTP DELETE request को handle करता है
- Data delete करने के लिए use होता है
- Resource को remove करता है

**Interview में कैसे बताएं:**
> "`@DeleteMapping` से मैंने delete operations handle किए हैं - जैसे pet delete करना, user delete करना।"

---

### **@CrossOrigin**
**Location:** Controller classes में
```java
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/pets")
public class PetController {
    // ...
}
```

**क्या होता है:**
- CORS (Cross-Origin Resource Sharing) enable करता है
- Frontend से different origin से requests allow करता है
- `origins = "*"` सभी origins को allow करता है

**Interview में कैसे बताएं:**
> "`@CrossOrigin` से मैंने CORS enable किया है ताकि React frontend (port 3000) से Spring Boot backend (port 8080) को requests भेज सकें।"

---

### **@PathVariable**
**Location:** Controller method parameters में
```java
@GetMapping("/{id}")
public Pet getPetById(@PathVariable Long id) {
    return petService.getPetById(id);
}
```

**क्या होता है:**
- URL path से variable extract करता है
- `{id}` जैसे path variables को bind करता है
- Dynamic values receive करने के लिए use होता है

**Example:**
- URL: `/api/pets/123`
- `@PathVariable Long id` = `123`

**Interview में कैसे बताएं:**
> "`@PathVariable` से मैंने URL से dynamic values extract किए हैं - जैसे `/api/pets/{id}` में `id` parameter automatically extract हो जाता है।"

---

### **@RequestParam**
**Location:** Controller method parameters में
```java
@PostMapping
public ResponseEntity<?> createPet(
    @RequestParam("petName") String petName,
    @RequestParam("species") String species,
    @RequestParam(value = "description", required = false) String description
) {
    // ...
}
```

**क्या होता है:**
- Query parameters या form data से values extract करता है
- `required = false` optional parameter बनाता है
- File uploads के लिए भी use होता है

**Example:**
- URL: `/api/pets?petName=Max&species=Dog`
- `@RequestParam("petName")` = `"Max"`

**Interview में कैसे बताएं:**
> "`@RequestParam` से मैंने query parameters और form data receive किए हैं - जैसे pet creation में multiple fields और file uploads handle किए।"

---

### **@RequestBody**
**Location:** Controller method parameters में
```java
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
    return authService.register(request);
}
```

**क्या होता है:**
- HTTP request body को Java object में convert करता है
- JSON data को automatically deserialize करता है
- POST/PUT requests में use होता है

**Interview में कैसे बताएं:**
> "`@RequestBody` से मैंने JSON request body को Java objects में convert किया है - जैसे registration form का data automatically `RegisterRequest` object में convert हो जाता है।"

---

## 🎯 **3. DEPENDENCY INJECTION ANNOTATIONS**

### **@Autowired**
**Location:** Service, Controller, Repository classes में
```java
@RestController
public class AuthController {
    @Autowired
    private AuthService authService;
}
```

**क्या होता है:**
- Dependency Injection करता है
- Spring automatically object inject करता है
- Constructor, field, या setter injection के लिए use होता है

**Interview में कैसे बताएं:**
> "`@Autowired` से मैंने dependency injection implement किया है। Spring automatically service objects को controller में inject करता है, जिससे loose coupling होता है।"

---

### **@Service**
**Location:** Service implementation classes में
```java
@Service
public class AuthServiceImpl implements AuthService {
    // ...
}
```

**क्या होता है:**
- Class को Spring service component बनाता है
- Business logic के लिए use होता है
- `@Component` का specialized version है

**Interview में कैसे बताएं:**
> "`@Service` से मैंने business logic classes को mark किया है। यह Spring को बताता है कि यह service layer है जहाँ business rules implement होते हैं।"

---

### **@Repository**
**Location:** Repository interfaces में
```java
@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    // ...
}
```

**क्या होता है:**
- Data access layer को mark करता है
- Database operations के लिए use होता है
- Exception translation provide करता है

**Interview में कैसे बताएं:**
> "`@Repository` से मैंने data access layer को mark किया है। यह database operations handle करता है और exceptions को Spring exceptions में convert करता है।"

---

### **@Component**
**Location:** Filter, Utility classes में
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // ...
}
```

**क्या होता है:**
- Generic Spring component बनाता है
- Spring container में bean register करता है
- Other annotations का base है

**Interview में कैसे बताएं:**
> "`@Component` से मैंने generic components mark किए हैं - जैसे JWT filter जो हर request पर run होता है।"

---

### **@Configuration**
**Location:** Configuration classes में
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // ...
}
```

**क्या होता है:**
- Class को configuration class बनाता है
- `@Bean` methods contain करता है
- Application configuration define करता है

**Interview में कैसे बताएं:**
> "`@Configuration` से मैंने configuration classes बनाई हैं - जैसे `SecurityConfig` जहाँ security rules define किए हैं।"

---

### **@Bean**
**Location:** Configuration class methods में
```java
@Configuration
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**क्या होता है:**
- Method return value को Spring bean बनाता है
- Spring container में register होता है
- Dependency injection के लिए available होता है

**Interview में कैसे बताएं:**
> "`@Bean` से मैंने custom beans define किए हैं - जैसे `PasswordEncoder` जो password encryption के लिए use होता है।"

---

### **@Value**
**Location:** Service/Controller classes में
```java
@Value("${spring.mail.username}")
private String fromEmail;
```

**क्या होता है:**
- `application.properties` से values inject करता है
- Configuration values read करता है
- Property placeholder resolve करता है

**Example:**
- `application.properties`: `spring.mail.username=test@gmail.com`
- `@Value("${spring.mail.username}")` = `"test@gmail.com"`

**Interview में कैसे बताएं:**
> "`@Value` से मैंने configuration properties inject किए हैं - जैसे email settings `application.properties` से automatically load होते हैं।"

---

## 🎯 **4. JPA / DATABASE ANNOTATIONS**

### **@Entity**
**Location:** Model/Entity classes में
```java
@Entity
@Table(name = "app_user")
public class User {
    // ...
}
```

**क्या होता है:**
- Class को JPA entity बनाता है
- Database table से map होता है
- Hibernate द्वारा manage होता है

**Interview में कैसे बताएं:**
> "`@Entity` से मैंने database tables को Java classes में map किया है। यह JPA को बताता है कि यह class database table represent करती है।"

---

### **@Table**
**Location:** Entity classes में
```java
@Entity
@Table(name = "app_user")
public class User {
    // ...
}
```

**क्या होता है:**
- Database table name specify करता है
- Default: class name = table name
- Custom table name define करता है

**Interview में कैसे बताएं:**
> "`@Table` से मैंने custom table names specify किए हैं - जैसे `User` class `app_user` table से map होती है।"

---

### **@Id**
**Location:** Entity class fields में
```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
```

**क्या होता है:**
- Primary key field mark करता है
- Unique identifier define करता है
- Database table का primary key होता है

**Interview में कैसे बताएं:**
> "`@Id` से मैंने primary key fields mark किए हैं - हर entity में unique ID field होती है।"

---

### **@GeneratedValue**
**Location:** `@Id` fields के साथ
```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

**क्या होता है:**
- Primary key auto-generate करता है
- `GenerationType.IDENTITY` = Auto-increment (MySQL)
- Database automatically ID generate करता है

**Interview में कैसे बताएं:**
> "`@GeneratedValue` से मैंने auto-increment IDs implement किए हैं - जब नया record create होता है, database automatically unique ID generate करता है।"

---

### **@Column**
**Location:** Entity class fields में
```java
@Column(name = "original_password")
private String originalPassword;

@Column(length = 1000)
private String photoUrls;
```

**क्या होता है:**
- Column name specify करता है
- Column properties define करता है (length, nullable, etc.)
- Default: field name = column name

**Interview में कैसे बताएं:**
> "`@Column` से मैंने column properties define किए हैं - जैसे column length, custom column names।"

---

### **@ManyToOne**
**Location:** Entity class fields में
```java
@ManyToOne
@JoinColumn(name = "shelter_id")
private Shelter shelter;
```

**क्या होता है:**
- Many-to-One relationship define करता है
- Foreign key relationship बनाता है
- Example: Many Pets → One Shelter

**Interview में कैसे बताएं:**
> "`@ManyToOne` से मैंने relationships define किए हैं - जैसे कई pets एक shelter से belong कर सकते हैं।"

---

### **@OneToMany**
**क्या होता है:**
- One-to-Many relationship define करता है
- Example: One Shelter → Many Pets

---

### **@JoinColumn**
**Location:** `@ManyToOne` या `@OneToOne` के साथ
```java
@ManyToOne
@JoinColumn(name = "shelter_id")
private Shelter shelter;
```

**क्या होता है:**
- Foreign key column name specify करता है
- Relationship column define करता है
- Database में foreign key बनाता है

**Interview में कैसे बताएं:**
> "`@JoinColumn` से मैंने foreign key columns specify किए हैं - जैसे `pet` table में `shelter_id` foreign key `shelter` table को point करती है।"

---

### **@PrePersist**
**Location:** Entity class methods में
```java
@PrePersist
protected void onCreate() {
    applicationDate = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
    if (status == null) {
        status = "pending";
    }
}
```

**क्या होता है:**
- Entity save करने से पहले execute होता है
- Default values set करने के लिए use होता है
- Timestamps set करने के लिए use होता है

**Interview में कैसे बताएं:**
> "`@PrePersist` से मैंने automatic timestamp setting implement किया है - जब नया record create होता है, automatically `createdAt` और default values set हो जाते हैं।"

---

### **@PreUpdate**
**Location:** Entity class methods में
```java
@PreUpdate
protected void onUpdate() {
    updatedAt = LocalDateTime.now();
}
```

**क्या होता है:**
- Entity update करने से पहले execute होता है
- `updatedAt` timestamp update करने के लिए use होता है

**Interview में कैसे बताएं:**
> "`@PreUpdate` से मैंने automatic `updatedAt` timestamp implement किया है - जब record update होता है, automatically timestamp update हो जाता है।"

---

## 🎯 **5. VALIDATION ANNOTATIONS**

### **@Valid**
**Location:** Controller method parameters में
```java
@PostMapping("/register")
public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
    return authService.register(request);
}
```

**क्या होता है:**
- Request validation trigger करता है
- DTO class में validation annotations check करता है
- Invalid data पर error return करता है

**Interview में कैसे बताएं:**
> "`@Valid` से मैंने request validation implement किया है - जब user registration data आता है, सभी validations automatically check होते हैं।"

---

### **@NotBlank**
**Location:** DTO class fields में
```java
@NotBlank(message = "Email is required")
private String email;
```

**क्या होता है:**
- Field empty नहीं हो सकता
- Null, empty string, या whitespace only reject करता है
- Required fields के लिए use होता है

**Interview में कैसे बताएं:**
> "`@NotBlank` से मैंने required field validation implement किया है - email, username जैसे fields mandatory हैं।"

---

### **@Email**
**Location:** DTO class fields में
```java
@Email(message = "Invalid email format")
private String email;
```

**क्या होता है:**
- Email format validate करता है
- Valid email pattern check करता है
- Invalid email पर error return करता है

**Interview में कैसे बताएं:**
> "`@Email` से मैंने email format validation implement किया है - सिर्फ valid email addresses accept होते हैं।"

---

### **@Size**
**Location:** DTO class fields में
```java
@Size(min = 6, message = "Password must be at least 6 characters")
private String password;
```

**क्या होता है:**
- String/Collection size validate करता है
- Min/max length check करता है
- Password length validation के लिए use होता है

**Interview में कैसे बताएं:**
> "`@Size` से मैंने length validation implement किया है - जैसे password minimum 6 characters होना चाहिए।"

---

### **@NotNull**
**Location:** DTO class fields में
```java
@NotNull(message = "Pet ID is required")
private Long petId;
```

**क्या होता है:**
- Field null नहीं हो सकता
- Required fields के लिए use होता है
- Primitive types के लिए automatically required होता है

**Interview में कैसे बताएं:**
> "`@NotNull` से मैंने null validation implement किया है - जैसे pet ID null नहीं हो सकता।"

---

### **@Min / @Max**
**Location:** DTO class fields में
```java
@Min(value = 0, message = "Age must be at least 0")
@Max(value = 30, message = "Age cannot exceed 30")
private Integer age;
```

**क्या होता है:**
- Numeric value range validate करता है
- Minimum/maximum value check करता है
- Age, price जैसे fields के लिए use होता है

**Interview में कैसे बताएं:**
> "`@Min` और `@Max` से मैंने range validation implement किया है - जैसे pet age 0 से 30 के बीच होनी चाहिए।"

---

## 🎯 **6. SPRING SECURITY ANNOTATIONS**

### **@EnableWebSecurity**
**Location:** Security configuration class में
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // ...
}
```

**क्या होता है:**
- Spring Security enable करता है
- Security configuration activate करता है
- Web security features enable करता है

**Interview में कैसे बताएं:**
> "`@EnableWebSecurity` से मैंने Spring Security enable किया है - यह security configuration को activate करता है।"

---

## 🎯 **7. JACKSON JSON ANNOTATIONS**

### **@JsonIgnore**
**Location:** Entity class fields में
```java
@JsonIgnore
private String password;
```

**क्या होता है:**
- Field JSON serialization से exclude करता है
- Sensitive data hide करता है
- Password जैसे fields API response में नहीं आते

**Interview में कैसे बताएं:**
> "`@JsonIgnore` से मैंने sensitive data hide किया है - password जैसे fields API response में include नहीं होते।"

---

### **@JsonIgnoreProperties**
**Location:** Entity class fields में
```java
@ManyToOne
@JoinColumn(name = "adopter_id")
@JsonIgnoreProperties({"password", "hibernateLazyInitializer", "handler"})
private User adopter;
```

**क्या होता है:**
- Related object के specific fields ignore करता है
- Circular references prevent करता है
- Lazy loading issues solve करता है

**Interview में कैसे बताएं:**
> "`@JsonIgnoreProperties` से मैंने circular reference issues solve किए हैं - जब pet object में user object है, तो user के password जैसे fields ignore हो जाते हैं।"

---

### **@JsonBackReference**
**Location:** Entity class fields में
```java
@ManyToOne
@JoinColumn(name = "shelter_id")
@JsonBackReference
private Shelter shelter;
```

**क्या होता है:**
- Bidirectional relationship में back reference mark करता है
- Circular reference prevent करता है
- JSON serialization में back reference exclude होता है

**Interview में कैसे बताएं:**
> "`@JsonBackReference` से मैंने bidirectional relationships handle किए हैं - pet से shelter तक reference है, लेकिन shelter से pet तक reference JSON में नहीं आता।"

---

### **@JsonManagedReference**
**क्या होता है:**
- Bidirectional relationship में managed reference mark करता है
- `@JsonBackReference` के opposite है
- Forward reference serialize होता है

---

## 🎯 **8. COMPLETE ANNOTATION SUMMARY**

### **By Category:**

#### **Controller Layer:**
- `@RestController` - REST API controller
- `@RequestMapping` - Base URL path
- `@GetMapping` - GET requests
- `@PostMapping` - POST requests
- `@PutMapping` - PUT requests
- `@DeleteMapping` - DELETE requests
- `@CrossOrigin` - CORS enable
- `@PathVariable` - URL path variables
- `@RequestParam` - Query/form parameters
- `@RequestBody` - JSON request body

#### **Service Layer:**
- `@Service` - Business logic component
- `@Autowired` - Dependency injection
- `@Override` - Method override

#### **Repository Layer:**
- `@Repository` - Data access component
- `@Entity` - Database entity
- `@Table` - Table name
- `@Id` - Primary key
- `@GeneratedValue` - Auto-increment ID
- `@Column` - Column properties
- `@ManyToOne` - Many-to-One relationship
- `@JoinColumn` - Foreign key column
- `@PrePersist` - Before save callback
- `@PreUpdate` - Before update callback

#### **Validation:**
- `@Valid` - Trigger validation
- `@NotBlank` - Required field
- `@Email` - Email format
- `@Size` - Length validation
- `@NotNull` - Not null validation
- `@Min` / `@Max` - Range validation

#### **Configuration:**
- `@Configuration` - Configuration class
- `@Bean` - Spring bean
- `@Value` - Property injection
- `@EnableWebSecurity` - Security enable

#### **JSON Handling:**
- `@JsonIgnore` - Ignore field in JSON
- `@JsonIgnoreProperties` - Ignore properties
- `@JsonBackReference` - Back reference
- `@JsonManagedReference` - Managed reference

---

## 🎤 **Interview में Complete Answer**

### **Question: "Which annotations have you used in your project?"**

**Answer:**
> "मैंने Spring Boot project में कई annotations use किए हैं:
> 
> **Controller Layer में:**
> - `@RestController` - REST API endpoints के लिए
> - `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping` - HTTP methods handle करने के लिए
> - `@PathVariable` - URL से dynamic values extract करने के लिए
> - `@RequestParam` - Query parameters और form data के लिए
> - `@RequestBody` - JSON data को Java objects में convert करने के लिए
> - `@CrossOrigin` - CORS enable करने के लिए
> 
> **Service Layer में:**
> - `@Service` - Business logic components mark करने के लिए
> - `@Autowired` - Dependency injection के लिए
> 
> **Database Layer में:**
> - `@Entity` - Database tables को Java classes में map करने के लिए
> - `@Id` और `@GeneratedValue` - Primary keys auto-generate करने के लिए
> - `@ManyToOne` और `@JoinColumn` - Relationships define करने के लिए
> - `@PrePersist` और `@PreUpdate` - Automatic timestamps set करने के लिए
> 
> **Validation में:**
> - `@Valid` - Request validation trigger करने के लिए
> - `@NotBlank`, `@Email`, `@Size`, `@NotNull` - Field validations के लिए
> 
> **Configuration में:**
> - `@Configuration` और `@Bean` - Custom configurations define करने के लिए
> - `@Value` - Properties inject करने के लिए
> 
> ये सभी annotations Spring Boot framework के core features हैं जो development को easy और efficient बनाते हैं।"

---

## ✅ **Key Points to Remember**

1. **Annotations Spring Boot को instructions देते हैं** - क्या करना है, कैसे करना है
2. **Annotations code को clean और readable बनाते हैं** - Boilerplate code कम होता है
3. **Annotations dependency injection enable करते हैं** - Loose coupling होता है
4. **Annotations automatic configurations provide करते हैं** - Less manual coding

---

**Good luck with your interview! 🚀**



