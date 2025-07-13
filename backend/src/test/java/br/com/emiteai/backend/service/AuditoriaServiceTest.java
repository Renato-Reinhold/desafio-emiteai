package br.com.emiteai.backend.service;

import br.com.emiteai.backend.model.Auditoria;
import br.com.emiteai.backend.repository.AuditoriaRepository;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuditoriaServiceTest {

    @Test
    void deveRegistrarAuditoria() {
        AuditoriaRepository repo = mock(AuditoriaRepository.class);
        AuditoriaService service = new AuditoriaService(repo);

        service.registrar("TESTE", "Descrição");

        ArgumentCaptor<Auditoria> captor = ArgumentCaptor.forClass(Auditoria.class);
        verify(repo, times(1)).save(captor.capture());

        Auditoria audit = captor.getValue();
        assertEquals("TESTE", audit.getAcao());
        assertEquals("Descrição", audit.getDescricao());
        assertNotNull(audit.getDataHora());
    }
    
}