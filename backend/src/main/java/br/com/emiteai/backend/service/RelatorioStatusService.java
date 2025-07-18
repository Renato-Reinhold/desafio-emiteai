package br.com.emiteai.backend.service;

import br.com.emiteai.backend.util.RelatorioStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class RelatorioStatusService {

    private RelatorioStatus status = RelatorioStatus.AGUARDANDO;
    private LocalDateTime ultimaGeracao = null;
    private String mensagemErro = null;

    public RelatorioStatus getStatus() {
        return status;
    }

    public void setStatus(RelatorioStatus status) {
        this.status = status;
        if (status == RelatorioStatus.PRONTO) {
            this.ultimaGeracao = LocalDateTime.now();
            this.mensagemErro = null;
        }
    }

    public void setErro(String mensagem) {
        this.status = RelatorioStatus.ERRO;
        this.mensagemErro = mensagem;
    }

    public String getMensagemErro() {
        return mensagemErro;
    }

    public LocalDateTime getUltimaGeracao() {
        return ultimaGeracao;
    }

    public void reset() {
        this.status = RelatorioStatus.AGUARDANDO;
        this.ultimaGeracao = null;
        this.mensagemErro = null;
    }
}
