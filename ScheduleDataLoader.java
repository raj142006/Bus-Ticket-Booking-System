package com.examly.springapp.util;

import com.examly.springapp.model.Schedule;
import com.examly.springapp.repository.ScheduleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ScheduleDataLoader implements CommandLineRunner {

    private final ScheduleRepository scheduleRepository;

    public ScheduleDataLoader(ScheduleRepository scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (scheduleRepository.count() == 0) {
            String[] cities = {"Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri", "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan", "Vasai", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli", "Tiruchirappalli", "Bareilly", "Mysore", "Tiruppur", "Gurgaon", "Aligarh", "Jalandhar", "Bhubaneswar", "Salem", "Warangal", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur", "Bhilai", "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli", "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"};
            String[] operators = {"RedBus Express", "VRL Travels", "SRS Travels", "Kallada Travels", "Volvo Express", "KPN Travels", "Orange Travels", "Parveen Travels", "Jabbar Travels", "Shivneri Travels", "MSRTC", "Royal Cruiser", "Neeta Travels", "UP Roadways", "Rajasthan Roadways"};
            String[] busTypes = {"AC Sleeper", "Non-AC Sleeper", "AC Semi Sleeper", "Non-AC Seater", "Volvo AC", "Multi Axle"};
            
            for (int i = 0; i < cities.length; i++) {
                for (int j = 0; j < cities.length; j++) {
                    if (i != j) {
                        String origin = cities[i];
                        String destination = cities[j];
                        int distance = Math.abs(i - j) * 50 + 100;
                        int hours = distance / 50;
                        
                        createSchedule(
                            operators[i % operators.length],
                            busTypes[j % busTypes.length],
                            origin,
                            destination,
                            String.format("%02d:00", (6 + i) % 24),
                            String.format("%02d:00%s", (6 + i + hours) % 24, hours > 18 ? "+1" : ""),
                            hours + "h",
                            3.5 + (i + j) % 15 * 0.1,
                            (double) (200 + distance * 2 + (i + j) % 500),
                            15 + (i + j) % 30
                        );
                    }
                }
            }
        }
    }

    private void createSchedule(String operator, String busType, String origin, String destination, 
                              String departureTime, String arrivalTime, String duration, 
                              Double rating, Double price, Integer seatsLeft) {
        Schedule schedule = new Schedule();
        schedule.setOperator(operator);
        schedule.setBusType(busType);
        schedule.setOrigin(origin);
        schedule.setDestination(destination);
        schedule.setDepartureTime(departureTime);
        schedule.setArrivalTime(arrivalTime);
        schedule.setDuration(duration);
        schedule.setRating(rating);
        schedule.setPrice(price);
        schedule.setSeatsLeft(seatsLeft);
        schedule.setBookedSeats("");
        scheduleRepository.save(schedule);
    }
}