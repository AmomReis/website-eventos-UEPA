package com.bes.site.eventos.uepa.controllers;

import com.bes.site.eventos.uepa.models.News;
import com.bes.site.eventos.uepa.repositories.NewsRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/news")
@CrossOrigin(origins = "*")
public class NewsController {

    private final NewsRepository newsRepository;

    public NewsController(NewsRepository newsRepository1) {
        this.newsRepository = newsRepository1;
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public News criar(
            @RequestParam String title,
            @RequestParam String content,
            @RequestParam MultipartFile imgNews
    ) throws IOException {

        // Nome do arquivo
        String nomeArquivo = System.currentTimeMillis() + "_" + imgNews.getOriginalFilename();

        // Caminho para static/images
        Path caminho = Paths.get("src/main/resources/static/images/" + nomeArquivo);

        // Salva o arquivo
        Files.write(caminho, imgNews.getBytes());

        // Cria o evento
        News news = new News();
        news.setTitle(title);
        news.setContent(content);
        news.setUrlBanner("/images/" + nomeArquivo); // Caminho que o frontend vai usar

        return newsRepository.save(news);
    }


    // LISTAR EVENTOS (HOME)
    @GetMapping
    public List<News> listar() {
        return newsRepository.findAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNews(@PathVariable Long id) {

        if (!newsRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        newsRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
