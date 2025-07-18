# Emiteaí - Avaliação Técnica

Este projeto é uma avaliação técnica para a empresa **Emiteaí**, que consiste no desenvolvimento de uma aplicação completa para cadastro de pessoas físicas, geração de relatório assíncrono em CSV e registro de auditoria de requisições.

---

## ✨ Funcionalidades

- Cadastro de pessoa física com:
  - Nome, telefone, CPF (com verificação de duplicidade)
  - Endereço completo (CEP, número, complemento, bairro, cidade, estado)
  - Preenchimento automático de endereço com API ViaCEP
- Geração assíncrona de relatório em CSV
- Registro de auditoria para todas as requisições
- Interface amigável com Material UI
- Exibição de logs de auditoria
- Integração via SSE (Server-Sent Events) para status do relatório
- Swagger para visualização da API REST

---

## 🛠️ Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot
- JUnit 5
- Flyway
- PostgreSQL
- RabbitMQ
- Docker
- Swagger

### Frontend
- React
- Vite
- TypeScript
- Axios
- Material UI
- Styled-components
- React Query

---

## 📦 Estrutura Docker

O projeto é containerizado com **Docker** e orquestrado com **Docker Compose**, com as imagens do frontend e backend publicadas no Docker Hub.

### Serviços incluídos no `docker-compose.yml`:

- PostgreSQL
- RabbitMQ
- Backend (`emiteai-backend`)
- Frontend (`emiteai-frontend`)
- Nginx (reverse proxy para o frontend na porta 80)

---

# 🚀 Como executar o projeto

Este projeto utiliza **Docker** e **Docker Compose** para facilitar a execução local de todos os serviços necessários.

---

## ✅ Pré-requisitos

Certifique-se de ter instalado:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Passos para execução

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/emiteai-teste-tecnico.git
cd emiteai-teste-tecnico
```

2. **Inicie os containers com Docker Compose**
```bash
docker-compose up --build
```
3. **Acesse a aplicação**

Frontend (interface web):
👉 http://localhost

Swagger (documentação da API):
👉 http://localhost/api/swagger-ui/index.html
