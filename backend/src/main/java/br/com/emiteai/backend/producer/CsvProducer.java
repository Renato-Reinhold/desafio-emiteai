package br.com.emiteai.backend.producer;

import br.com.emiteai.backend.config.RabbitMQConfig;
import br.com.emiteai.backend.service.RelatorioStatusService;
import br.com.emiteai.backend.util.RelatorioStatus;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class CsvProducer {

    private final RabbitTemplate rabbitTemplate;
    private final RelatorioStatusService statusService;

    public CsvProducer(RabbitTemplate rabbitTemplate, RelatorioStatusService statusService) {
        this.rabbitTemplate = rabbitTemplate;
        this.statusService = statusService;
    }

    public void solicitarGeracaoCSV() {
        statusService.setStatus(RelatorioStatus.EXECUTANDO);
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_RELATORIO, "gerar");
    }
}
