package com.bes.site.eventos.uepa.repositories;

import com.bes.site.eventos.uepa.models.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParticipantRepository extends JpaRepository<Participant, Long> {
}
