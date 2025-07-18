import React, { Fragment, type ReactElement } from 'react';

import { Backdrop, Button, CircularProgress } from '@mui/material';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';

import { Page } from '../../components/page.js';
import { PageHeader } from '../../components/page-header.js';
import { useDeletePersonMutation, usePersonsQuery } from '../../queries/persons.queries.js';

import { PersonCard } from './components/person-card.js';
import { toast } from 'sonner';
import { useRequestReportMutation } from '../../queries/reports.queries.js';

function Persons(): ReactElement {
  const navigate = useNavigate();

  const deletePersonMutation = useDeletePersonMutation({
    onSuccess: () => {
      toast.success('Pessoa deletada com sucesso!');
    },
    onError: () => {
      toast.error('Erro ao deletar pessoa. Tente novamente.');
    },
  });

  const generateReportMutation = useRequestReportMutation({
    onSuccess: () => {
      toast.success('Solicitação de geração de relatório enviada com sucesso!', {
        description: 'O relatório será gerado e estará disponível para download em breve.',
      });
    },
  });

  const onGenerateReport = (): void => {
    generateReportMutation.mutate();
  };

  const onEditPerson = (id: number): void => {
    navigate({ to: '/edit/$id', params: { id: `${id}` } });
  };

  const onDeletePerson = (id: number): void => {
    deletePersonMutation.mutate(id);
  };

  const actions = [
    <Link key="add-person" to="/create">
      <Button variant="contained" color="primary">
        Adicionar Pessoa Física
      </Button>
    </Link>,

    <Button variant="contained" color="secondary" key="generate-report" onClick={onGenerateReport}>
      Gerar Relatório
    </Button>

  ];

  return (
    <Page>
      <PageHeader title="Pessoa Física" actions={actions}/>

      <div style={{display: 'flex', flexDirection: 'column', gap: 16, position: 'relative' }}>
        <PersonsList
          onEdit={onEditPerson}
          onDelete={onDeletePerson}
        />
      </div>

      <Outlet />
    </Page>
  );
}

interface PersonListProps {
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

function PersonsList(props: PersonListProps): ReactElement {
  const { data, isLoading, isFetching } = usePersonsQuery();

  if (isLoading || isFetching) {
    return (
      <Backdrop open sx={{ position: 'absolute' }}>
        <CircularProgress color="inherit"/>
      </Backdrop>
    );
  }

  return (
    <Fragment>
      {
        (data?.persons ?? []).map((person) => (
          <PersonCard
            key={person.id}
            person={person}
            onEdit={() => props.onEdit?.(person.id)}
            onDelete={() => props.onDelete?.(person.id)}
          />
        ))
      }
    </Fragment>
  );
}

export {
  Persons,
};
