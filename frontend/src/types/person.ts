import { isValidCEP, isValidCPF, isValidLandlinePhone, isValidMobilePhone, isValidPhone, onlyNumbers, } from '@brazilian-utils/brazilian-utils';

import { z } from 'zod';

interface Person {
  id: number;
  nome: string;
  telefone: string;
  cpf: string;
  cep: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipio: string;
  estado: string;
};

const strParams = {
  error: 'Campo Obrigatório',
};

const personSchema = z.object({
  nome: z.string(strParams).min(1).max(255),
  telefone: z.string(strParams).min(1)
    .refine((value: string) => isValidPhone(value) || isValidLandlinePhone(value) || isValidMobilePhone(value), { error: 'Telefone Inválido' }),
  cpf: z.string(strParams).min(1)
    .refine((value: string) => isValidCPF(value), { error: 'CPF Inválido' })
    .transform((value: string) => onlyNumbers(value)),
  cep: z.string(strParams).min(1)
    .refine((value: string) => isValidCEP(value), { error: 'CEP Inválido' })
    .transform((value: string) => onlyNumbers(value)),
  numero: z.string(strParams).min(1),
  complemento: z.string().optional(),
  bairro: z.string(strParams).min(1),
  municipio: z.string(strParams).min(1),
  estado: z.string(strParams).min(1),
});

export type {
  Person,
}

export {
  personSchema,
};