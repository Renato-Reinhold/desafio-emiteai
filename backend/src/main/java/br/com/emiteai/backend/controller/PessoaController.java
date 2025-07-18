package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
import br.com.emiteai.backend.service.AuditoriaService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/pessoas")
public class PessoaController {

    private final PessoaRepository repository;
    private final AuditoriaService auditoriaService;

    public PessoaController(PessoaRepository repository, AuditoriaService auditoriaService) {
        this.repository = repository;
        this.auditoriaService = auditoriaService;
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid PessoaDTO dto) {
        if (repository.findByCpf(dto.getCpf()).isPresent()) {
            return ResponseEntity.badRequest().body("CPF já cadastrado.");
        }

        Pessoa pessoa = new Pessoa();
        pessoa.setNome(dto.getNome());
        pessoa.setTelefone(dto.getTelefone());
        pessoa.setCpf(dto.getCpf());
        pessoa.setNumero(dto.getNumero());
        pessoa.setComplemento(dto.getComplemento());
        pessoa.setCep(dto.getCep());
        pessoa.setBairro(dto.getBairro());
        pessoa.setMunicipio(dto.getMunicipio());
        pessoa.setEstado(dto.getEstado());

        Pessoa save = repository.save(pessoa);
        auditoriaService.registrar("CADASTRO_PESSOA", "Pessoa cadastrada com CPF " + dto.getCpf());
        return ResponseEntity.ok(save);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllPersons() {
        Map<String, Object> response = new HashMap<>();
        response.put("persons", repository.findAll());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> findById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        response.put("person", repository.findById(id));
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody @Valid PessoaDTO dto) {
        Pessoa pessoa = repository.findById(id).orElseThrow(() -> new RuntimeException("Pessoa Não encontrada"));
        pessoa.setNome(dto.getNome());
        pessoa.setTelefone(dto.getTelefone());
        pessoa.setCpf(dto.getCpf());
        pessoa.setNumero(dto.getNumero());
        pessoa.setComplemento(dto.getComplemento());
        pessoa.setCep(dto.getCep());
        pessoa.setBairro(dto.getBairro());
        pessoa.setMunicipio(dto.getMunicipio());
        pessoa.setEstado(dto.getEstado());
        Pessoa save = repository.save(pessoa);
        auditoriaService.registrar("ATUALIZACAO_PESSOA", "Pessoa atualizada com CPF " + pessoa.getCpf());
        return ResponseEntity.ok(save);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable Long id) {
        Pessoa pessoa = repository.findById(id).orElseThrow(() -> new RuntimeException("Pessoa Não encontrada"));
        auditoriaService.registrar("REMOVER_PESSOA", "Pessoa removida com CPF " + pessoa.getCpf());
        repository.delete(pessoa);
    }

}
