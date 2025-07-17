import { useEffect } from 'react';
import type { ReactElement } from 'react';

import { ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from '@mui/material';
import { useForm, useWatch } from 'react-hook-form';
import type z from 'zod';

import { CEPFormField, CPFFormField, FormField, PhoneFormField } from '../../../components/fields.js';
import type { personSchema } from '../../../types/person.js';
import { useCEPAddress } from '../hooks/use-cep-address.js';

type PersonFormData = z.infer<typeof personSchema>;

interface PersonFormProps {
  form: ReturnType<typeof useForm<PersonFormData>>;
  onSubmit: (data: PersonFormData) => void;
  editMode?: boolean;
}

function PersonForm(props: PersonFormProps): ReactElement {
  const { form, onSubmit } = props;

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <PersonData form={form} editMode={props.editMode} />
      <PersonAddress form={form} />
    </Box>
  );
}

function PersonData(props: Pick<PersonFormProps, 'form' | 'editMode'>): ReactElement {
  const { form, editMode } = props;

  return (
    <Accordion defaultExpanded variant="outlined">
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Dados Pessoais</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid spacing={2} container>
          <Grid size={12}>
            <FormField form={form} name="name" label="Nome" />
          </Grid>

          <Grid size={6}>
            <CPFFormField
              form={form}
              name="cpf"
              label="CPF"
              textFieldProps={{ placeholder: '000.000.000-00' }}
              disabled={editMode}
            />
          </Grid>

          <Grid size={6}>
            <PhoneFormField
              form={form}
              name="phone"
              label="Telefone"
              textFieldProps={{ placeholder: '(00) 00000-0000' }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function PersonAddress(props: Pick<PersonFormProps, 'form'>): ReactElement {
  const { form } = props;

  const cep = useWatch({ control: form.control, name: 'address.cep' });

  const { data, loading } = useCEPAddress({ cep });

  useEffect(() => {
    if (data?.bairro) {
      form.setValue('address.bairro', data.bairro, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }

    if (data?.localidade) {
      form.setValue('address.municipio', data.localidade, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }

    if (data?.uf) {
      form.setValue('address.estado', data.estado, { shouldValidate: true, shouldDirty: true, shouldTouch: true });
    }
  }, [form, data])

  return (
    <Accordion defaultExpanded variant="outlined">
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography variant="h6">Endereço</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid spacing={2} container>
          <Grid size={6}>
            <FormField form={form} name="address.numero" label="Número" />
          </Grid>

          <Grid size={6}>
            <FormField form={form} name="address.complemento" label="Complemento" />
          </Grid>

          <Grid size={6}>
            <CEPFormField form={form} name="address.cep" label="CEP" loading={loading} />
          </Grid>

          <Grid size={6}>
            <FormField form={form} name="address.bairro" label="Bairro" loading={loading} />
          </Grid>

          <Grid size={6}>
            <FormField form={form} name="address.municipio" label="Município" loading={loading} />
          </Grid>

          <Grid size={6}>
            <FormField form={form} name="address.estado" label="Estado" loading={loading} />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export {
  PersonForm,
};
