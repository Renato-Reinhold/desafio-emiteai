// src/pages/RegisterPerson.tsx
import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useViaCep } from "../hooks/useViaCep";

export default function RegisterPerson() {
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    cpf: "",
    cep: "",
    numero: "",
    complemento: "",
    bairro: "",
    municipio: "",
    estado: "",
  });

  const { fetchEndereco } = useViaCep();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "cep" && value.length === 8) {
      fetchEndereco(value).then((res) => {
        if (res) {
          setForm((prev) => ({
            ...prev,
            bairro: res.bairro,
            municipio: res.localidade,
            estado: res.uf,
          }));
        }
      });
    }
  };

  const handleSubmit = () => {
    // fazer requisição com axios para o backend
  };

  return (
    <Box p={2}>
      <h2>Cadastro de Pessoa</h2>
      <Grid container spacing={2}>
        <TextField
          fullWidth
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="CPF"
          name="cpf"
          value={form.cpf}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="CEP"
          name="cep"
          value={form.cep}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Número"
          name="numero"
          value={form.numero}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Complemento"
          name="complemento"
          value={form.complemento}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Bairro"
          name="bairro"
          value={form.bairro}
          onChange={handleChange}
          disabled
        />
        <TextField
          fullWidth
          label="Município"
          name="municipio"
          value={form.municipio}
          onChange={handleChange}
          disabled
        />
        <TextField
          fullWidth
          label="Estado"
          name="estado"
          value={form.estado}
          onChange={handleChange}
          disabled
        />
      </Grid>

      <Box mt={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
}
