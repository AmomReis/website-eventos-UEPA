package com.bes.site.eventos.uepa.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_participantes")
@Getter @Setter
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idParticipant;

    private String name;

    private String email;

    private String course;

    private String registration;

    public Participant() {
    }

    public Participant(String name, String email, String course, String registration) {
        this.name = name;
        this.email = email;
        this.course = course;
        this.registration = registration;
    }
}
