import React, { ReactElement } from 'react';

import {
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Assignment as CpfIcon,
  type SvgIconComponent
} from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Typography } from '@mui/material';
import { formatCEP, formatCPF } from '@brazilian-utils/brazilian-utils';

import type { Person } from '../../../types/person';

function getInitials(name: string): string {
  return name.split(' ').map(name => name[0]).join('').toUpperCase();
}

function getFormattedAddress(person: Person): string {
  const { numero, municipio, estado, complemento, cep, bairro } = person;

  return `${numero}${complemento ? ` ${complemento}` : ''}, ${bairro}, ${municipio} - ${estado}, ${formatCEP(cep)}`;
}

interface PersonCardProps {
  person: Person;
  onEdit?: () => void;
  onDelete?: () => void;
}

function PersonCard(props: PersonCardProps): ReactElement {
  const { person } = props;

  return (
    <Card sx={{ width: '100%', boxShadow: 3 }}>
      <CardHeader
        action={<Actions onEdit={props.onEdit} onDelete={props.onDelete} />}
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {getInitials(person.nome)}
          </Avatar>
        }
        title={
          <Typography variant="h6" component="div">
            {person.nome}
          </Typography>
        }
      />

      <Divider />

      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }} flexWrap="wrap">
          <Entry icon={CpfIcon} label="CPF" value={formatCPF(person.cpf)} />
          <Entry icon={PhoneIcon} label="Telefone" value={person.telefone} />
          <Entry icon={LocationIcon} label="Endereço" value={getFormattedAddress(person)} />
        </Box>
      </CardContent>

    </Card>
  );
}

interface EntryProps {
  icon: SvgIconComponent;
  label: string;
  value: string;
}

function Entry(props: EntryProps): ReactElement {
  const { icon: Icon, label, value } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Icon fontSize="large" sx={{ color: 'text.secondary' }} />

      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}:
        </Typography>

        <Typography variant="body1" color="text.primary">
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

interface ActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
}

function Actions(props: ActionsProps): ReactElement {
  return (
    <CardActions disableSpacing sx={{ gap: '.5rem', justifyContent: 'flex-end' }}>
      <Button variant="text" color="primary" onClick={props.onEdit}>
        Editar
      </Button>

      <Button variant="text" color="error" onClick={props.onDelete}>
        Excluir
      </Button>
    </CardActions>
  );
}

export {
  PersonCard,
};