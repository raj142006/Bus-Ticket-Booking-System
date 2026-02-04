package com.examly.springapp.service;

import com.examly.springapp.model.Schedule;
import java.util.List;

public interface ScheduleService {
    List<Schedule> getAllSchedules();
    Schedule getScheduleById(Long id);
    List<Schedule> searchSchedules(String origin, String destination);
    Schedule saveSchedule(Schedule schedule);
    void deleteSchedule(Long id);
    List<String> getAllCities();
}