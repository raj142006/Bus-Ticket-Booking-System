package com.examly.springapp.util;

import com.examly.springapp.model.Schedule;
import com.examly.springapp.repository.ScheduleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    
    private final ScheduleRepository scheduleRepository;
    
    public DataLoader(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }
    
    @Override
    public void run(String... args) throws Exception {
        if (scheduleRepository.count() == 0) {
            loadInitialData();
        }
    }
    
    private void loadInitialData() {
        String[] cities = {"Coimbatore", "Chennai", "Bangalore", "Madurai", "Mumbai", "Pune", 
                          "Delhi", "Hyderabad", "Kolkata", "Jaipur", "Agra", "Chandigarh", 
                          "Vijayawada", "Nashik", "Goa", "Bhubaneswar"};
        
        String[] operators = {"KPN Travels", "SRS Travels", "VRL Travels", "Orange Travels", 
                             "Parveen Travels", "Setc Travels", "YBM Travels", "City Travels"};
        
        String[] busTypes = {"AC Sleeper", "AC Seater", "Non-AC Seater", "Volvo AC"};
        
        for (String origin : cities) {
            for (String destination : cities) {
                if (!origin.equals(destination)) {
                    for (int i = 0; i < 3; i++) {
                        Schedule schedule = new Schedule();
                        schedule.setOperator(operators[(int)(Math.random() * operators.length)]);
                        schedule.setBusType(busTypes[(int)(Math.random() * busTypes.length)]);
                        schedule.setOrigin(origin);
                        schedule.setDestination(destination);
                        
                        int hour = (int)(Math.random() * 24);
                        String minute = Math.random() < 0.5 ? "00" : "30";
                        schedule.setDepartureTime(String.format("%02d:%s", hour, minute));
                        
                        int arrivalHour = (hour + 8) % 24;
                        schedule.setArrivalTime(String.format("%02d:%s", arrivalHour, minute));
                        schedule.setDuration("8h");
                        
                        schedule.setRating(3.5 + Math.random() * 1.5);
                        schedule.setPrice(500.0 + Math.random() * 1500);
                        schedule.setSeatsLeft((int)(Math.random() * 30) + 5);
                        schedule.setBookedSeats("A1,B2");
                        
                        scheduleRepository.save(schedule);
                    }
                }
            }
        }
    }
}