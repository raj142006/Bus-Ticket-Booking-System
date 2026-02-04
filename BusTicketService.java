package com.examly.springapp.service;

import com.examly.springapp.model.BusTicket;
import java.util.List;

public interface BusTicketService {
    BusTicket bookTicket(BusTicket ticket);
    List<BusTicket> getAllTickets();
    List<BusTicket> getTicketsByRoute(String route);
    List<BusTicket> getTicketsSortedByDate();
    BusTicket cancelTicket(Long id);
    java.util.Map<String,Object> getStatistics();
}
