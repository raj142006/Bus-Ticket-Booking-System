package com.examly.springapp.repository;

import com.examly.springapp.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUserId(Long userId);
    List<Booking> findByBookingStatus(String bookingStatus);
    List<Booking> findByPnrNumber(String pnrNumber);
    List<Booking> findByScheduleId(Long scheduleId);
}