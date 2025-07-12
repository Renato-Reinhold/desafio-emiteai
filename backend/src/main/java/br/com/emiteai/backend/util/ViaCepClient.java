package br.com.emiteai.backend.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

public class ViaCepClient {

    private static final String URL = "https://viacep.com.br/ws/{cep}/json/";

    public static ViaCepResponse buscarCep(String cep) {
        RestTemplate restTemplate = new RestTemplate();
        try {
            return restTemplate.getForObject(URL, ViaCepResponse.class, cep);
        } catch (HttpClientErrorException e) {
            throw new RuntimeException("CEP inválido ou não encontrado");
        }
    }
}
