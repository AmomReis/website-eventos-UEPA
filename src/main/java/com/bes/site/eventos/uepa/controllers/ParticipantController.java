package com.bes.site.eventos.uepa.controllers;

import com.bes.site.eventos.uepa.models.Participant;
import com.bes.site.eventos.uepa.repositories.ParticipantRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ParticipantController {

    private final ParticipantRepository repository;

    public ParticipantController(ParticipantRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public String home() {
        return "index.html";
    }

    @GetMapping("/inscricao")
    public String mostrarFormulario(Model model) {
        model.addAttribute("participante", new Participant());
        return "evento.html";
    }

    @PostMapping("/inscricao")
    public String processarInscricao(@ModelAttribute Participant participante) {
        repository.save(participante);
        return "redirect:/success.html";
    }
}

