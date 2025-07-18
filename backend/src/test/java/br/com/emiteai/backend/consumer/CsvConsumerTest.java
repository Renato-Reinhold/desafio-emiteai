package br.com.emiteai.backend.consumer;

import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
import br.com.emiteai.backend.service.RelatorioStatusService;
import com.opencsv.CSVReader;
import org.junit.jupiter.api.*;

import java.io.FileReader;
import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CsvConsumerTest {

    private PessoaRepository pessoaRepository;
    private RelatorioStatusService statusService;
    private CsvConsumer consumer;

    @BeforeEach
    void setup() {
        pessoaRepository = mock(PessoaRepository.class);
        statusService = new RelatorioStatusService();

        consumer = new CsvConsumer(pessoaRepository, statusService);
    }

    @Test
    void deveGerarArquivoCsvComUmaPessoa() throws Exception {
        Pessoa p = new Pessoa();
        p.setNome("Fulano");
        p.setTelefone("4899999999");
        p.setCpf("12345678901");
        p.setCep("88000000");
        p.setNumero("100");
        p.setComplemento("Casa");
        p.setBairro("Centro");
        p.setMunicipio("Florianópolis");
        p.setEstado("SC");

        when(pessoaRepository.findAll()).thenReturn(List.of(p));

        consumer.gerarCsv("gerar");

        assertEquals(br.com.emiteai.backend.util.RelatorioStatus.PRONTO, statusService.getStatus());

        try (CSVReader reader = new CSVReader(new FileReader("relatorio.csv"))) {
            List<String[]> linhas = reader.readAll();
            assertEquals(2, linhas.size());
            assertEquals("Fulano", linhas.get(1)[0]);
        }
    }

    @Test
    void deveSetarStatusErroSeFalhar() {
        when(pessoaRepository.findAll()).thenThrow(new RuntimeException("Falha no banco"));

        consumer.gerarCsv("gerar");

        assertEquals(br.com.emiteai.backend.util.RelatorioStatus.ERRO, statusService.getStatus());
        assertNotNull(statusService.getMensagemErro());
    }
}
