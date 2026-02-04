package com.examly.springapp.service;

import com.examly.springapp.model.Schedule;
import com.examly.springapp.repository.ScheduleRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ScheduleServiceImpl implements ScheduleService {
    
    private final ScheduleRepository scheduleRepository;
    
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    
    @Override
    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }
    
    @Override
    public Schedule getScheduleById(Long id) {
        return scheduleRepository.findById(id).orElse(null);
    }
    
    @Override
    public List<Schedule> searchSchedules(String origin, String destination) {
        return scheduleRepository.findByOriginAndDestination(origin, destination);
    }
    
    @Override
    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }
    
    @Override
    public void deleteSchedule(Long id) {
        scheduleRepository.deleteById(id);
    }
    
    @Override
    public List<String> getAllCities() {
        List<Schedule> schedules = scheduleRepository.findAll();
        return schedules.stream()
                .flatMap(s -> java.util.stream.Stream.of(s.getOrigin(), s.getDestination()))
                .distinct()
                .sorted()
                .collect(java.util.stream.Collectors.toList());
    }
}