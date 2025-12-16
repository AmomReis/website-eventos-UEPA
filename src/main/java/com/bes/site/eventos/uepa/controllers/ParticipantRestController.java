package com.bes.site.eventos.uepa.controllers;

import com.bes.site.eventos.uepa.models.Participant;
import com.bes.site.eventos.uepa.repositories.ParticipantRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/participants")
@CrossOrigin(origins = "*")
public class ParticipantRestController {

    private final ParticipantRepository repository;

    public ParticipantRestController(ParticipantRepository repository) {
        this.repository = repository;
    }

    // LISTAR TODOS
    @GetMapping
    public List<Participant> listarTodos() {
        return repository.findAll();
    }

    // CONTAR TODOS
    @GetMapping("/count")
    public long contarTodos() {
        return repository.count();
    }
    // 🔥 EXCLUIR PARTICIPANTE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build(); // 204
    }
}

