package com.bes.site.eventos.uepa.controllers;

import com.bes.site.eventos.uepa.models.Event;
import com.bes.site.eventos.uepa.repositories.EventRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/events")
@CrossOrigin(origins = "*")
public class EventController {

    private final EventRepository repository;

    public EventController(EventRepository repository) {
        this.repository = repository;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Event criar(
            @RequestParam("titleEvent") String titleEvent,
            @RequestParam("descriptionEvent") String descriptionEvent,
            @RequestParam("dateEvent") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateEvent,
            @RequestParam("startEvent") String startEvent,
            @RequestParam("locationEvent") String locationEvent,
            @RequestParam("imgEvento") MultipartFile imgEvento
    ) throws IOException {

        // Nome do arquivo
        String nomeArquivo = System.currentTimeMillis() + "_" + imgEvento.getOriginalFilename();

        // Caminho para static/images
        Path caminho = Paths.get("src/main/resources/static/images/" + nomeArquivo);

        // Salva o arquivo
        Files.write(caminho, imgEvento.getBytes());

        // Cria o evento
        Event event = new Event();
        event.setTitleEvent(titleEvent);
        event.setDescriptionEvent(descriptionEvent);
        event.setDateEvent(dateEvent);
        event.setStartEvent(startEvent);
        event.setLocationEvent(locationEvent);

        // Caminho que o frontend vai usar
        event.setUrlBanner("/images/" + nomeArquivo);

        return repository.save(event);
    }


    // LISTAR EVENTOS (HOME)
    @GetMapping
    public List<Event> listar() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

