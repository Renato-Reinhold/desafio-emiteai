package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.producer.CsvProducer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RelatorioController {

    private final CsvProducer producer;

    public RelatorioController(CsvProducer producer) {
        this.producer = producer;
    }

    @GetMapping("/api/relatorio/csv")
    public String gerarRelatorio() {
        producer.solicitarGeracaoCSV();
        return "Relatório sendo gerado...";
    }
}
