import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";

interface Pessoa {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
  cep: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  estado: string;
}

const fetchPessoas = async (): Promise<Pessoa[]> => {
  const response = await axios.get("/api/pessoas"); // ajuste conforme a URL do seu backend
  return response.data;
};

export default function PeopleList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["pessoas"],
    queryFn: fetchPessoas,
  });

  const exportCsv = async () => {
    try {
      const res = await axios.get("/api/pessoas/exportar", {
        responseType: "blob",
      });

      const blob = new Blob([res.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio_pessoas.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Erro ao exportar CSV", error);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return <Typography color="error">Erro ao carregar dados.</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Lista de Pessoas Cadastradas
      </Typography>

      <Button variant="outlined" onClick={exportCsv} sx={{ mb: 2 }}>
        Exportar CSV
      </Button>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Complemento</TableCell>
              <TableCell>Bairro</TableCell>
              <TableCell>Município</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((pessoa) => (
              <TableRow key={pessoa.id}>
                <TableCell>{pessoa.nome}</TableCell>
                <TableCell>{pessoa.telefone}</TableCell>
                <TableCell>{pessoa.cpf}</TableCell>
                <TableCell>{pessoa.cep}</TableCell>
                <TableCell>{pessoa.numero}</TableCell>
                <TableCell>{pessoa.complemento}</TableCell>
                <TableCell>{pessoa.bairro}</TableCell>
                <TableCell>{pessoa.municipio}</TableCell>
                <TableCell>{pessoa.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
