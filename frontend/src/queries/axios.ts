import axios from 'axios';

const viaCEPAPI = axios.create({
  baseURL: 'https://viacep.com.br/ws'
});

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export {
  viaCEPAPI,
  API,
};
