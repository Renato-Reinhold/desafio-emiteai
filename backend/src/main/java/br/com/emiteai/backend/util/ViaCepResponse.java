package br.com.emiteai.backend.util;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ViaCepResponse {
    private String bairro;

    @JsonProperty("localidade")
    private String municipio;

    @JsonProperty("uf")
    private String estado;

    @JsonProperty("erro")
    private Boolean erro;
}
