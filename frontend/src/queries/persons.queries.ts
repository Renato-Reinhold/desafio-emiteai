import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { API } from './axios.js';
import type { Person } from '../types/person.js';

/*
const mock = new Map<string, Person>([
  ['12345678901', { name: 'John Doe', phone: '1234567890', cpf: '12345678901', address: { cep: '12345-678', numero: '100', complemento: 'Apt 1', bairro: 'Downtown', municipio: 'Cityville', estado: 'ST' } }],
  ['10987654321', { name: 'Jane Smith', phone: '0987654321', cpf: '10987654321', address: { cep: '87654-321', numero: '200', complemento: 'Suite 2', bairro: 'Uptown', municipio: 'Townsville', estado: 'TS' } }],
  ['11223344556', { name: 'Alice Johnson', phone: '1122334455', cpf: '11223344556', address: { cep: '11223-445', numero: '300', complemento: 'Unit 3', bairro: 'Suburbia', municipio: 'Villageville', estado: 'SV' } }],
  ['55667788990', { name: 'Bob Brown', phone: '5566778899', cpf: '55667788990', address: { cep: '55667-788', numero: '400', complemento: 'Floor 4', bairro: 'Countryside', municipio: 'Farmville', estado: 'CF' } }],
]);
 */

interface GetAllPersonsResponse {
  persons: Person[];
}

interface GetPersonByIdResponse {
  person: Person;
}

interface CreatePersonResponse {
  person?: Person;
  success: boolean;
}

interface UpdatePersonResponse {
  person?: Person;
  success: boolean;
}

interface DeletePersonResponse {
  success: boolean;
}

async function fetchAllPersons(): Promise<GetAllPersonsResponse> {
  const response = await API.get<GetAllPersonsResponse>('/pessoas');
  if (response.status !== 200) {
    throw new Error(`Error fetching Persons: ${response.statusText}`);
  }

  return response.data;

}

async function fetchPersonById(id: number): Promise<GetPersonByIdResponse> {
  const response = await API.get<GetPersonByIdResponse>(`/pessoas/${id}`);

  if (response.status !== 200) {
    throw new Error(`Error fetching Persons: ${response.statusText}`);
  }

  return response.data;
}

async function createPerson(person: Omit<Person, 'id'>): Promise<CreatePersonResponse> {
  const response = await API.post<CreatePersonResponse>('/pessoas', person);

  return response.data;
}

async function updatePerson(id: number, person: Omit<Person, 'id'>): Promise<UpdatePersonResponse> {
  const response = await API.put<UpdatePersonResponse>(`/pessoas/${id}`, person);

  return response.data;
}

async function deletePerson(id: number): Promise<DeletePersonResponse> {
  const response = await API.delete<DeletePersonResponse>(`/pessoas/${id}`);

  return response.data;
}

type UsePersonsQueryOptions = Omit<UseQueryOptions<GetAllPersonsResponse, Error>, 'queryKey' | 'queryFn'>;

function usePersonsQuery(options?: UsePersonsQueryOptions): UseQueryResult<GetAllPersonsResponse, Error> {
  return useQuery({
    ...options,
    queryKey: ['persons'],
    queryFn: fetchAllPersons,
  });
}

type UsePersonQueryOptions = Omit<UseQueryOptions<GetPersonByIdResponse, Error>, 'queryKey' | 'queryFn'>;

function usePersonQuery(id: number, options?: UsePersonQueryOptions): UseQueryResult<GetPersonByIdResponse, Error> {
  return useQuery({
    ...options,
    queryKey: ['person', id],
    queryFn: () => fetchPersonById(id),
  });
}

type UseCreatePersonMutationOptions = Omit<UseMutationOptions<CreatePersonResponse, Error, Omit<Person, 'id'>>, 'mutationKey' | 'mutationFn'>;

function useCreatePersonMutation(options?: UseCreatePersonMutationOptions): UseMutationResult<CreatePersonResponse, Error, Omit<Person, 'id'>> {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: ['create-person'],
    mutationFn: (data) => createPerson(data),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }

      queryClient.invalidateQueries({ queryKey: ['persons'] });
    }
  });
}

type UseUpdatePersonMutationOptions = Omit<UseMutationOptions<UpdatePersonResponse, Error, { id: number; person: Omit<Person, 'id'> }>, 'mutationKey' | 'mutationFn'>;

function useUpdatePersonMutation(options?: UseUpdatePersonMutationOptions): UseMutationResult<UpdatePersonResponse, Error, { id: number; person: Omit<Person, 'id'> }> {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: ['update-person'],
    mutationFn: ({ id, person }) => updatePerson(id, person),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }

      queryClient.invalidateQueries({ queryKey: ['persons'] });
      queryClient.invalidateQueries({ queryKey: ['person', variables.id] });
    }
  });
}

type UseDeletePersonMutationOptions = Omit<UseMutationOptions<DeletePersonResponse, Error, number>, 'mutationKey' | 'mutationFn'>;

function useDeletePersonMutation(options?: UseDeletePersonMutationOptions): UseMutationResult<DeletePersonResponse, Error, number> {
  const queryClient = useQueryClient();

  return useMutation({
    ...options,
    mutationKey: ['delete-person'],
    mutationFn: (id) => deletePerson(id),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }

      queryClient.invalidateQueries({ queryKey: ['persons'] });
      queryClient.invalidateQueries({ queryKey: ['person', variables] });
    }
  });
}

export {
  usePersonsQuery,
  usePersonQuery,
  useCreatePersonMutation,
  useUpdatePersonMutation,
  useDeletePersonMutation,
};
