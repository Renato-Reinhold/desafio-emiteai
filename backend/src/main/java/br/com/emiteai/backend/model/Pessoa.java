package br.com.emiteai.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Pessoa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String telefone;

    @Column(unique = true)
    private String cpf;

    private String numero;
    private String complemento;
    private String cep;
    private String bairro;
    private String municipio;
    private String estado;
}
