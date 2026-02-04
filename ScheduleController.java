package com.examly.springapp.controller;

import com.examly.springapp.model.Schedule;
import com.examly.springapp.service.ScheduleService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/schedules")
@CrossOrigin(origins = "https://8081-badefcfddaabbbffbdeadcacbdaadcf.premiumproject.examly.io")
public class ScheduleController {
    
    private final ScheduleService scheduleService;
    
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }
    
    @GetMapping
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }
    
    @GetMapping("/{id}")
    public Schedule getScheduleById(@PathVariable Long id) {
        Schedule schedule = scheduleService.getScheduleById(id);
        if (schedule == null) {
            throw new RuntimeException("Schedule not found with id: " + id);
        }
        return schedule;
    }
    
    @GetMapping("/{id}/seats")
    public Schedule getScheduleSeats(@PathVariable Long id) {
        return scheduleService.getScheduleById(id);
    }
    
    @GetMapping("/search")
    public List<Schedule> searchSchedules(@RequestParam String origin, @RequestParam String destination) {
        return scheduleService.searchSchedules(origin, destination);
    }
    
    @GetMapping("/cities")
    public List<String> getAllCities() {
        return scheduleService.getAllCities();
    }
    
    @PostMapping
    public Schedule createSchedule(@RequestBody Schedule schedule) {
        return scheduleService.saveSchedule(schedule);
    }
    
    @DeleteMapping("/{id}")
    public void deleteSchedule(@PathVariable Long id) {
        scheduleService.deleteSchedule(id);
    }
}