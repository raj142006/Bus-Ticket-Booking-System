package com.examly.springapp.controller;

import com.examly.springapp.model.Booking;
import com.examly.springapp.service.BookingService;
import com.examly.springapp.configuration.JWTUtil;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "https://8081-badefcfddaabbbffbdeadcacbdaadcf.premiumproject.examly.io")
public class BookingController {
    
    private final BookingService bookingService;
    private final JWTUtil jwtUtil;
    
    public BookingController(BookingService bookingService, JWTUtil jwtUtil) {
        this.bookingService = bookingService;
        this.jwtUtil = jwtUtil;
    }
    
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking, HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
            String userRole = jwtUtil.extractRole(token);
            if (!"PASSENGER".equals(userRole)) {
                throw new SecurityException("Only passengers can create bookings");
            }
        }
        return bookingService.createBooking(booking);
    }
    
    @GetMapping("/user/{userId}")
    public List<Booking> getUserBookings(@PathVariable Long userId) {
        return bookingService.getUserBookings(userId);
    }
    
    @PutMapping("/cancel/{id}")
    public Booking cancelBooking(@PathVariable Long id) {
        return bookingService.cancelBooking(id);
    }
    
    @GetMapping("/{id}")
    public Booking getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }
    
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }
}