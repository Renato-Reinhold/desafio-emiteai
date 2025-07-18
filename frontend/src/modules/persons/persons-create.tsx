import React, { ReactElement } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type z from 'zod';

import { useCreatePersonMutation } from '../../queries/persons.queries';
import { personSchema } from '../../types/person';

import { PersonForm } from './components/person-form';
import { PersonModal } from './components/person-modal';
import {Button, DialogActions} from "@mui/material";

type PersonFormData = z.infer<typeof personSchema>;

function PersonsCreate(): ReactElement {
  const navigate = useNavigate();

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
  });

  const createMutation = useCreatePersonMutation({
    onSuccess: () => {
      navigate({ to: '/' });

      toast.success('Pessoa criada com sucesso!');
    },
    onError: () => {
      // API Validation based on error response, duplicate CPF etc
      // form.setError('cpf', { message: 'asdaa' });
      toast.error('Erro ao criar pessoa. Verifique os dados e tente novamente.');
    },
  })

  const onCancel = (): void => {
    navigate({ to: '/' });
  };

  const onSubmit = (data: PersonFormData): void => {
    createMutation.mutate({ ...data });
  };

  return (
    <PersonModal title="Cadastro de Pessoa Física" onCancel={onCancel} onSubmit={onSubmit}>
      <PersonForm form={form} onSubmit={onSubmit}>
        <DialogActions sx={{ pr: 0, py: 0 }} >
          <Button onClick={onCancel} color="error" variant="outlined">
            Cancelar
          </Button>

          <Button type="submit" color="primary" variant="outlined">
            Salvar
          </Button>
        </DialogActions>
      </PersonForm>

    </PersonModal>
  );
}

export {
  PersonsCreate
};
