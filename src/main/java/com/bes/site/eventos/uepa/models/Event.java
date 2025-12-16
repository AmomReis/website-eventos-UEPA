package com.bes.site.eventos.uepa.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "tb_eventos")
@Getter
@Setter
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvent;

    private String titleEvent;

    @Column(length = 1000)
    private String descriptionEvent;

    private LocalDate dateEvent;

    private String startEvent;

    private String locationEvent;

    // caminho/URL da imagem
    private String urlBanner;

    public Event() {
    }

    public Event(
            String titleEvent,
            String descriptionEvent,
            LocalDate dateEvent,
            String startEvent,
            String locationEvent,
            String urlBanner
    ) {
        this.titleEvent = titleEvent;
        this.descriptionEvent = descriptionEvent;
        this.dateEvent = dateEvent;
        this.startEvent = startEvent;
        this.locationEvent = locationEvent;
        this.urlBanner = urlBanner;
    }
}