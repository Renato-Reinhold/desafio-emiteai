package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
import br.com.emiteai.backend.service.AuditoriaService;
import br.com.emiteai.backend.util.ViaCepClient;
import br.com.emiteai.backend.util.ViaCepResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/pessoas")
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

        ViaCepResponse endereco = ViaCepClient.buscarCep(dto.getCep());
        if (endereco.getErro() != null && endereco.getErro()) {
            return ResponseEntity.badRequest().body("CEP inválido.");
        }

        Pessoa pessoa = new Pessoa();
        pessoa.setNome(dto.getNome());
        pessoa.setTelefone(dto.getTelefone());
        pessoa.setCpf(dto.getCpf());
        pessoa.setNumero(dto.getNumero());
        pessoa.setComplemento(dto.getComplemento());
        pessoa.setCep(dto.getCep());
        pessoa.setBairro(endereco.getBairro());
        pessoa.setMunicipio(endereco.getMunicipio());
        pessoa.setEstado(endereco.getEstado());

        Pessoa salva = repository.save(pessoa);
        auditoriaService.registrar("CADASTRO_PESSOA", "Pessoa cadastrada com CPF " + dto.getCpf());
        return ResponseEntity.ok(salva);
    }


    @GetMapping
    public List<Pessoa> listar() {
        return repository.findAll();
    }


}
