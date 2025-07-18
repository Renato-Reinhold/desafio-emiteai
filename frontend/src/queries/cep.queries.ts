import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

import { viaCEPAPI } from './axios.js';

interface CEPSuccessResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  unidade: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

interface CEPErrorResponse {
  erro: boolean;
}

type CEPAPIResponse = CEPSuccessResponse | CEPErrorResponse;

async function fetchCEP(cep: string): Promise<CEPSuccessResponse> {
  const response = await viaCEPAPI.get<CEPAPIResponse>(`/${cep}/json/`);

  if (response.status !== 200) {
    throw new Error(`Error fetching CEP: ${response.statusText}`);
  }

  if ('erro' in response.data) {
    throw new Error(`CEP not found: ${cep}`);
  }

  return response.data;
};

type UseCEPQueryOptions = Omit<UseQueryOptions<CEPSuccessResponse, Error>, 'queryKey' | 'queryFn'>;

function useCEPQuery(cep: string, options?: UseCEPQueryOptions): UseQueryResult<CEPSuccessResponse, Error> {
  return useQuery({
    ...options,
    queryKey: ['cep', cep],
    queryFn: () => fetchCEP(cep),
  });
}

export {
  useCEPQuery,
};
