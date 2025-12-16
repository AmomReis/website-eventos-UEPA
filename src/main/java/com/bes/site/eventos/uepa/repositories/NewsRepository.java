package com.bes.site.eventos.uepa.repositories;

import com.bes.site.eventos.uepa.models.News;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewsRepository extends JpaRepository<News, Long> {
}
