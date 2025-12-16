package com.bes.site.eventos.uepa.repositories;

import com.bes.site.eventos.uepa.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
