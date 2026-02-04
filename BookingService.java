package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import java.util.List;

public interface BookingService {
    Booking createBooking(Booking booking);
    List<Booking> getUserBookings(Long userId);
    Booking cancelBooking(Long bookingId);
    Booking getBookingById(Long id);
    List<Booking> getAllBookings();
}