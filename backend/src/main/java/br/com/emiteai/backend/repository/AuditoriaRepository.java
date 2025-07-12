package br.com.emiteai.backend.repository;

import br.com.emiteai.backend.model.Auditoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditoriaRepository extends JpaRepository<Auditoria, Long> {
}
