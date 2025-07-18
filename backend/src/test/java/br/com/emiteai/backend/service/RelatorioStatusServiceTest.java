package br.com.emiteai.backend.service;

import br.com.emiteai.backend.util.RelatorioStatus;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RelatorioStatusServiceTest {

    @Test
    void deveAtualizarStatusParaProntoComData() {
        RelatorioStatusService service = new RelatorioStatusService();
        service.setStatus(RelatorioStatus.PRONTO);

        assertEquals(RelatorioStatus.PRONTO, service.getStatus());
        assertNotNull(service.getUltimaGeracao());
    }

    @Test
    void deveRegistrarErroComMensagem() {
        RelatorioStatusService service = new RelatorioStatusService();
        service.setErro("Algo deu errado");

        assertEquals(RelatorioStatus.ERRO, service.getStatus());
        assertEquals("Algo deu errado", service.getMensagemErro());
    }

    @Test
    void deveResetarStatus() {
        RelatorioStatusService service = new RelatorioStatusService();
        service.setStatus(RelatorioStatus.PRONTO);
        service.setErro("Erro");

        service.reset();

        assertEquals(RelatorioStatus.AGUARDANDO, service.getStatus());
        assertNull(service.getUltimaGeracao());
        assertNull(service.getMensagemErro());
    }
}