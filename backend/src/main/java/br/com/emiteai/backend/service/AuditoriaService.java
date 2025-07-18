package br.com.emiteai.backend.service;

import br.com.emiteai.backend.model.Auditoria;
import br.com.emiteai.backend.repository.AuditoriaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditoriaService {

    private final AuditoriaRepository repository;

    public AuditoriaService(AuditoriaRepository repository) {
        this.repository = repository;
    }

    public void registrar(String acao, String descricao) {
        Auditoria log = new Auditoria();
        log.setAcao(acao);
        log.setDescricao(descricao);
        log.setDataHora(LocalDateTime.now());
        repository.save(log);
    }
}
