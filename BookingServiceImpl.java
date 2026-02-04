package com.examly.springapp.service;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Schedule;
import com.examly.springapp.repository.BookingRepository;
import com.examly.springapp.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Arrays;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {
    
    private final BookingRepository bookingRepository;
    private final ScheduleRepository scheduleRepository;
    
    public BookingServiceImpl(BookingRepository bookingRepository, ScheduleRepository scheduleRepository) {
        this.bookingRepository = bookingRepository;
        this.scheduleRepository = scheduleRepository;
    }
    
    @Override
    public Booking createBooking(Booking booking) {
        booking.setBookingDateTime(LocalDateTime.now());
        booking.setPnrNumber("PNR" + System.currentTimeMillis());
        booking.setBookingStatus("CONFIRMED");
        
        Schedule schedule = scheduleRepository.findById(booking.getScheduleId()).orElse(null);
        if (schedule != null) {
            booking.setBusName(schedule.getOperator());
            
            synchronized(this) {
                schedule = scheduleRepository.findById(booking.getScheduleId()).orElse(null);
                String currentBookedSeats = schedule.getBookedSeats() != null ? schedule.getBookedSeats() : "";
                String newBookedSeats = currentBookedSeats.isEmpty() ? 
                    booking.getSeatNumbers() : 
                    currentBookedSeats + "," + booking.getSeatNumbers();
                schedule.setBookedSeats(newBookedSeats);
                schedule.setSeatsLeft(Math.max(0, schedule.getSeatsLeft() - booking.getSeatNumbers().split(",").length));
                scheduleRepository.save(schedule);
            }
        }
        
        return bookingRepository.save(booking);
    }
    
    @Override
    public List<Booking> getUserBookings(Long userId) {
        return bookingRepository.findByUserId(userId);
    }
    
    @Override
    public Booking cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking != null && "CONFIRMED".equals(booking.getBookingStatus())) {
            booking.setBookingStatus("CANCELLED");
            
            Schedule schedule = scheduleRepository.findById(booking.getScheduleId()).orElse(null);
            if (schedule != null) {
                synchronized(this) {
                    schedule = scheduleRepository.findById(booking.getScheduleId()).orElse(null);
                    String bookedSeats = schedule.getBookedSeats();
                    if (bookedSeats != null) {
                        List<String> cancelledSeats = Arrays.asList(booking.getSeatNumbers().split(","));
                        List<String> seatList = Arrays.stream(bookedSeats.split(","))
                            .map(String::trim)
                            .filter(seat -> !cancelledSeats.contains(seat.trim()))
                            .collect(Collectors.toList());
                        schedule.setBookedSeats(String.join(",", seatList));
                        schedule.setSeatsLeft(schedule.getSeatsLeft() + cancelledSeats.size());
                        scheduleRepository.save(schedule);
                    }
                }
            }
            
            return bookingRepository.save(booking);
        }
        return null;
    }
    
    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}