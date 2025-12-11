package com.bes.site.eventos.uepa.controllers;

import com.bes.site.eventos.uepa.models.Participant;
import com.bes.site.eventos.uepa.repositories.RepositoryParticipant;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class ControllerParticipant {

    private final RepositoryParticipant repository;

    public ControllerParticipant(RepositoryParticipant repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    public String home() {
        return "redirect:/index.html";
    }


    @GetMapping("/inscricao")
    public String mostrarFormulario(Model model) {
        model.addAttribute("participante", new Participant());
        return "forms"; //ainda será criado
    }

    @PostMapping("/inscricao")
    public String processarInscricao(@ModelAttribute Participant participante, Model model) {
        repository.save(participante);
        return "Sucess"; //ainda será criado
    }
}
