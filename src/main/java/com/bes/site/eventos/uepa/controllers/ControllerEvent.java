package com.bes.site.eventos.uepa.controllers;

import com.bes.site.eventos.uepa.models.Event;
import com.bes.site.eventos.uepa.repositories.RepositoryEvent;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class ControllerEvent {

    private final RepositoryEvent repository;

    public ControllerEvent(RepositoryEvent repository) {
        this.repository = repository;
    }

    // CADASTRAR EVENTO
    @PostMapping
    public Event criar(@RequestBody Event event) {
        return repository.save(event);
    }

    // LISTAR EVENTOS (HOME)
    @GetMapping
    public List<Event> listar() {
        return repository.findAll();
    }
}

