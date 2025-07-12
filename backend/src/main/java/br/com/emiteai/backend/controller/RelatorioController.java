package br.com.emiteai.backend.controller;

import br.com.emiteai.backend.producer.CsvProducer;
import br.com.emiteai.backend.service.AuditoriaService;
import br.com.emiteai.backend.service.RelatorioStatusService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@RestController
public class RelatorioController {

    private final CsvProducer producer;
    private final RelatorioStatusService statusService;
    private final AuditoriaService auditoriaService;

    public RelatorioController(CsvProducer producer, RelatorioStatusService statusService, AuditoriaService auditoriaService) {
        this.producer = producer;
        this.statusService = statusService;
        this.auditoriaService = auditoriaService;
    }

    @GetMapping("/api/relatorio/csv")
    public String gerarRelatorio() {
        producer.solicitarGeracaoCSV();
        return "Relatório sendo gerado...";
    }

    @GetMapping("/api/relatorio/download")
    public ResponseEntity<Resource> downloadCsv() {
        try {
            File file = new File("relatorio.csv");

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=relatorio.csv")
                    .contentType(MediaType.parseMediaType("text/csv"))
                    .contentLength(file.length())
                    .body(resource);

        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/api/relatorio/status")
    public ResponseEntity<Map<String, String>> statusRelatorio() {
        Map<String, String> response = new HashMap<>();
        response.put("status", statusService.getStatus().name());

        LocalDateTime data = statusService.getUltimaGeracao();
        response.put("ultimaGeracao", data != null ? data.toString() : "N/A");

        String erro = statusService.getMensagemErro();
        if (erro != null) {
            response.put("erro", erro);
        }
        auditoriaService.registrar("RELATORIO", "Relatorio CSV esta: " + response.get("status"));

        return ResponseEntity.ok(response);
    }

}
