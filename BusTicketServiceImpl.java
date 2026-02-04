package com.examly.springapp.service;

import com.examly.springapp.model.BusTicket;
import com.examly.springapp.repository.BusTicketRepository;
import com.examly.springapp.exception.TicketNotFoundException;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class BusTicketServiceImpl implements BusTicketService {

    private final BusTicketRepository repo;

    public BusTicketServiceImpl(BusTicketRepository repo) {
        this.repo = repo;
    }

    @Override
    public BusTicket bookTicket(BusTicket ticket) {
        return repo.save(ticket);
    }

    @Override
    public List<BusTicket> getAllTickets() {
        return repo.findAll();
    }

    @Override
    public List<BusTicket> getTicketsByRoute(String route) {
        return repo.findByRoute(route);
    }

    @Override
    public List<BusTicket> getTicketsSortedByDate() {
        return repo.findAll().stream()
                .sorted(Comparator.comparing(BusTicket::getBookingDateTime))
                .collect(Collectors.toList());
    }

    @Override
    public BusTicket cancelTicket(Long id) {
        BusTicket ticket = repo.findById(id)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));
        ticket.setStatus("CANCELLED");
        return repo.save(ticket);
    }

    @Override
    public Map<String, Object> getStatistics() {
        List<BusTicket> tickets = repo.findAll();
        double totalRevenue = tickets.stream()
                .filter(t -> "BOOKED".equalsIgnoreCase(t.getStatus()))
                .mapToDouble(BusTicket::getFare)
                .sum();
        long activeBookings = tickets.stream()
                .filter(t -> "BOOKED".equalsIgnoreCase(t.getStatus()))
                .count();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRevenue", totalRevenue);
        stats.put("activeBookings", activeBookings);
        stats.put("totalTickets", tickets.size());
        return stats;
    }
}
