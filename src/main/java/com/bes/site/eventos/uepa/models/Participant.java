package com.bes.site.eventos.uepa.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_participante")
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Long Id;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String course;

    @Getter @Setter
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
