package br.com.emiteai.backend.consumer;

import br.com.emiteai.backend.config.RabbitMQConfig;
import br.com.emiteai.backend.model.Pessoa;
import br.com.emiteai.backend.repository.PessoaRepository;
import br.com.emiteai.backend.service.RelatorioStatusService;
import br.com.emiteai.backend.util.RelatorioStatus;
import com.opencsv.CSVWriter;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@Component
public class CsvConsumer {

    private final PessoaRepository repository;
    private final RelatorioStatusService statusService;

    public CsvConsumer(PessoaRepository repository, RelatorioStatusService statusService) {
        this.repository = repository;
        this.statusService = statusService;
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_RELATORIO)
    public void gerarCsv(String comando) {
        try (CSVWriter writer = new CSVWriter(new FileWriter("relatorio.csv"))) {
            List<Pessoa> pessoas = repository.findAll();
            writer.writeNext(new String[]{"Nome", "Telefone", "CPF", "CEP", "Número", "Complemento", "Bairro", "Município", "Estado"});
            for (Pessoa p : pessoas) {
                writer.writeNext(new String[]{
                        p.getNome(),
                        p.getTelefone(),
                        p.getCpf(),
                        p.getCep(),
                        p.getNumero(),
                        p.getComplemento(),
                        p.getBairro(),
                        p.getMunicipio(),
                        p.getEstado()
                });
            }
            statusService.setStatus(RelatorioStatus.PRONTO);
        } catch (Exception e) {
            statusService.setErro("Erro ao gerar o relatório: " + e.getMessage());
        }
    }
}
