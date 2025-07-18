package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.dto.PessoaDTO;
import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
import br.com.emiteai.backend.service.AuditoriaService;
import br.com.emiteai.backend.util.ViaCepClient;
import br.com.emiteai.backend.util.ViaCepResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(PessoaController.class)
class PessoaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PessoaRepository repository;

    @MockitoBean
    private AuditoriaService auditoriaService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void deveCadastrarPessoaComSucesso() throws Exception {
        PessoaDTO dto = new PessoaDTO();
        dto.setNome("João");
        dto.setCpf("12345678901");
        dto.setCep("89230779");
        dto.setNumero("100");
        dto.setTelefone("4899999999");

        Mockito.when(repository.findByCpf("12345678901")).thenReturn(Optional.empty());
        Mockito.when(repository.save(Mockito.any())).thenReturn(new Pessoa());

        mockMvc.perform(post("/api/pessoas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk());
    }

    @Test
    void deveRejeitarCadastroComCpfDuplicado() throws Exception {
        PessoaDTO dto = new PessoaDTO();
        dto.setNome("Maria");
        dto.setCpf("12345678901");
        dto.setCep("01001000");
        dto.setNumero("101");
        dto.setTelefone("48988888888");

        Mockito.when(repository.findByCpf("12345678901")).thenReturn(Optional.of(new Pessoa()));

        mockMvc.perform(post("/api/pessoas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deveRejeitarCadastroComCepInvalido() throws Exception {
        PessoaDTO dto = new PessoaDTO();
        dto.setNome("Carlos");
        dto.setCpf("12345678903");
        dto.setCep("12345678");
        dto.setNumero("123");
        dto.setTelefone("48999990000");

        Mockito.when(repository.findByCpf(dto.getCpf())).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/pessoas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("CEP inválido."));
    }

    @Test
    void deveRejeitarCadastroComCepQueRetornaErroTrue() throws Exception {
        PessoaDTO dto = new PessoaDTO();
        dto.setNome("Roberta");
        dto.setCpf("12345678904");
        dto.setCep("01000000");
        dto.setNumero("222");
        dto.setTelefone("48988887777");

        ViaCepResponse erroResponse = new ViaCepResponse();
        erroResponse.setErro(true);

        Mockito.when(repository.findByCpf(dto.getCpf())).thenReturn(Optional.empty());

        mockMvc.perform(post("/api/pessoas")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("CEP inválido."));
    }

}
