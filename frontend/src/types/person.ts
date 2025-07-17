import { isValidCEP, isValidCPF, isValidLandlinePhone, isValidMobilePhone, isValidPhone } from '@brazilian-utils/brazilian-utils';

import { z } from 'zod';

interface Address {
  cep: string;
  numero: string;
  complemento?: string;
  bairro: string;
  municipio: string;
  estado: string;
}

interface Person {
  name: string;
  phone: string;
  cpf: string;
  address: Address;
};

const strParams = {
  error: 'Campo Obrigatório',
};

const addressSchema = z.object({
  cep: z.string(strParams).min(1).refine((value: string) => isValidCEP(value), { error: 'CEP Inválido' }),
  numero: z.string(strParams).min(1),
  complemento: z.string().optional(),
  bairro: z.string(strParams).min(1),
  municipio: z.string(strParams).min(1),
  estado: z.string(strParams).min(1),
});

const personSchema = z.object({
  name: z.string(strParams).min(1).max(255),
  phone: z.string(strParams).min(1).refine((value: string) => isValidPhone(value) || isValidLandlinePhone(value) || isValidMobilePhone(value), { error: 'Telefone Inválido' }),
  cpf: z.string(strParams).min(1).refine((value: string) => isValidCPF(value), { error: 'CPF Inválido' }),
  address: addressSchema,
});

export type {
  Address,
  Person,
}

export {
  addressSchema,
  personSchema,
};
