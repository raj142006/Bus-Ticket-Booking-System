package com.examly.springapp.configuration;

import org.springframework.stereotype.Component;

@Component
public class JWTUtil {
    public String generateToken(String subject) {
        return "dummy-token-for-" + subject;
    }
    
    public String extractRole(String token) {
        // Simple token parsing for demo - in production use proper JWT library
        if (token.contains("passenger@")) return "PASSENGER";
        if (token.contains("admin@")) return "ADMIN";
        if (token.contains("driver@")) return "DRIVER";
        if (token.contains("agent@")) return "TRAVEL_AGENT";
        if (token.contains("fleet@")) return "FLEET_MANAGER";
        if (token.contains("operator@")) return "BUS_OPERATOR";
        return "PASSENGER"; // Default to passenger
    }
}
