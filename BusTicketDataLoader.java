package com.examly.springapp.util;

import com.examly.springapp.model.BusTicket;
import com.examly.springapp.repository.BusTicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class BusTicketDataLoader implements CommandLineRunner {

    private final BusTicketRepository repo;

    public BusTicketDataLoader(BusTicketRepository repo) {
        this.repo = repo;
    }

    @Override
    public void run(String... args) throws Exception {
        if (repo.count() == 0) {
            BusTicket t1 = new BusTicket();
            t1.setPassengerName("Seeder Passenger");
            t1.setRoute("Hyderabad-Bangalore");
            t1.setSeatNumber("S1");
            t1.setBookingDateTime(LocalDateTime.now());
            t1.setDepartureTime(LocalDateTime.now().plusDays(1));
            t1.setFare(1000.0);
            t1.setStatus("BOOKED");
            repo.save(t1);
        }
    }
}
