import { Fragment } from 'react';
import type { ReactElement } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Backdrop, CircularProgress } from '@mui/material';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

import { personSchema } from '../../types/person.js';
import { usePersonQuery, useUpdatePersonMutation } from '../../queries/persons.queries.js';

import { PersonForm } from './components/person-form.js';
import { PersonModal } from './components/person-modal.js';

type PersonFormData = z.infer<typeof personSchema>;


const route = getRouteApi('/edit/$cpf');

function PersonsUpdate(): ReactElement {
  const navigate = useNavigate();

  const { cpf } = route.useParams();

  const { data, isLoading } = usePersonQuery(cpf);

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    values: data?.person,
  });

  const updatePersonMutation = useUpdatePersonMutation({
    onSuccess: () => {
      navigate({ to: '/' });

      toast.success('Pessoa atualizada com sucesso!');
    },
    onError: () => {
      // API Validation based on error response, duplicate CPF etc
      // form.setError('cpf', { message: 'asdaa' });
      toast.error('Erro ao atualizar pessoa. Verifique os dados e tente novamente.');
    },
  });

  const onCancel = (): void => {
    navigate({ to: '/' });
  };

  const onSubmit = (data: PersonFormData): void => {
    updatePersonMutation.mutate({ id: cpf, person: { ...data } });
  };

  return (
    <Fragment>
      {
        isLoading ? (
          <Backdrop open sx={{ zIndex: 9999 }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : null
      }

      <PersonModal title="Edição de Pessoa Física" onCancel={onCancel} onSubmit={onSubmit}>
        <PersonForm form={form} onSubmit={onSubmit} />
      </PersonModal>
    </Fragment>
  )
}

export {
  PersonsUpdate,
};
