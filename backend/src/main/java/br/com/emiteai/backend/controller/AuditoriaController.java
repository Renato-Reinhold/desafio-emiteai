package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.model.Auditoria;
import br.com.emiteai.backend.repository.AuditoriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auditoria")
public class AuditoriaController {

    private final AuditoriaRepository repository;

    public AuditoriaController(AuditoriaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Auditoria> listar() {
        return repository.findAll();
    }
}
