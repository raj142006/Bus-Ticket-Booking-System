package com.examly.springapp.repository;

import com.examly.springapp.model.BusTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BusTicketRepository extends JpaRepository<BusTicket, Long> {
    List<BusTicket> findByRoute(String route);
}
