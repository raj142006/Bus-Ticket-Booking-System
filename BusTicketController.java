package com.examly.springapp.controller;

import com.examly.springapp.model.BusTicket;
import com.examly.springapp.service.BusTicketService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "https://8081-badefcfddaabbbffbdeadcacbdaadcf.premiumproject.examly.io")
public class BusTicketController {

    private final BusTicketService service;

    public BusTicketController(BusTicketService service) {
        this.service = service;
    }

    @PostMapping("/book")
    public BusTicket bookTicket(@RequestBody BusTicket ticket) {
        return service.bookTicket(ticket);
    }

    @GetMapping("/all")
    public List<BusTicket> getAllTickets() {
        return service.getAllTickets();
    }

    @GetMapping("/byRoute")
    public List<BusTicket> getTicketsByRoute(@RequestParam String route) {
        return service.getTicketsByRoute(route);
    }

    @GetMapping("/sortedByDate")
    public List<BusTicket> getTicketsSortedByDate() {
        return service.getTicketsSortedByDate();
    }

    @PutMapping("/cancel/{id}")
    public BusTicket cancelTicket(@PathVariable Long id) {
        return service.cancelTicket(id);
    }

    @GetMapping("/statistics")
    public Map<String,Object> getStatistics() {
        return service.getStatistics();
    }
}