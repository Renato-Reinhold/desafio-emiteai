package br.com.emiteai.backend.producer;

import br.com.emiteai.backend.config.RabbitMQConfig;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class CsvProducer {

    private final RabbitTemplate rabbitTemplate;

    public CsvProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void solicitarGeracaoCSV() {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUEUE_RELATORIO, "gerar");
    }
}
