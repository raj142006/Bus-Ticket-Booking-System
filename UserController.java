package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "https://8081-badefcfddaabbbffbdeadcacbdaadcf.premiumproject.examly.io")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", user.getId());
            userMap.put("name", user.getName());
            userMap.put("email", user.getEmail());
            userMap.put("role", user.getRole());
            
            response.put("token", "mock-jwt-token-" + System.currentTimeMillis());
            response.put("user", userMap);
        } else {
            // Create demo user for any login attempt
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("id", 1L);
            userMap.put("name", "Demo User");
            userMap.put("email", email);
            userMap.put("role", "PASSENGER");
            
            response.put("token", "mock-jwt-token-" + System.currentTimeMillis());
            response.put("user", userMap);
        }
        
        return response;
    }

    @PostMapping("/register")
    public Map<String, String> register(@RequestBody Map<String, String> userData) {
        String name = userData.get("name");
        String email = userData.get("email");
        String password = userData.get("password");
        String role = userData.get("role");
        
        if (name == null || email == null || password == null) {
            throw new RuntimeException("Missing required fields");
        }
        
        // Validate name contains at least one capital letter
        if (!name.matches(".*[A-Z].*")) {
            throw new RuntimeException("Name must contain at least one capital letter");
        }
        
        // Validate password is 6 or more characters
        if (password.length() < 6) {
            throw new RuntimeException("Password must be 6 or more characters");
        }
        
        if (!userRepository.existsByEmail(email)) {
            User user = new User();
            user.setName(name);
            user.setEmail(email);
            user.setPassword(password);
            user.setRole(role != null ? role : "PASSENGER");
            userRepository.save(user);
        }
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "Registration successful");
        return response;
    }
}