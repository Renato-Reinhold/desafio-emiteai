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

## 🌐 Configuração do Nginx

O Nginx serve o frontend na porta `80` com a seguinte configuração:

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://backend:8080/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /relatorio/status {
        proxy_pass http://backend:8080;
        proxy_set_header Connection '';
        proxy_http_version 1.1;
        chunked_transfer_encoding off;
        proxy_buffering off;
        proxy_cache off;
        proxy_read_timeout 86400;
    }
}
