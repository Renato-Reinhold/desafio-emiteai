package br.com.emiteai.backend.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUEUE_RELATORIO = "relatorio-csv";

    @Bean
    public Queue relatorioQueue() {
        return new Queue(QUEUE_RELATORIO, false);
    }
}
