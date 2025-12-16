package com.bes.site.eventos.uepa.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_news")
@Getter
@Setter
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String content;

    // caminho/URL da imagem
    private String urlBanner;

    public News() {
    }

    public News(String title, String content, String urlBanner) {
        this.title = title;
        this.content = content;
        this.urlBanner = urlBanner;
    }
}
