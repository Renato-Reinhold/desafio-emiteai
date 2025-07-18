import React, { Fragment } from "react";
import type { ReactElement } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {Backdrop, Button, CircularProgress, DialogActions} from "@mui/material";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";

import { personSchema } from "../../types/person.js";
import {
  usePersonQuery,
  useUpdatePersonMutation,
} from "../../queries/persons.queries.js";

import { PersonForm } from "./components/person-form.js";
import { PersonModal } from "./components/person-modal.js";

type PersonFormData = z.infer<typeof personSchema>;

const route = getRouteApi("/edit/$id");

function PersonsUpdate(): ReactElement {
  const navigate = useNavigate();

  const { id } = route.useParams();

  const { data, isLoading } = usePersonQuery(Number(id));

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personSchema),
    values: data?.person,
  });

  const updatePersonMutation = useUpdatePersonMutation({
    onSuccess: () => {
      navigate({ to: "/" });

      toast.success("Pessoa atualizada com sucesso!");
    },
    onError: () => {
      // API Validation based on error response, duplicate CPF etc
      // form.setError('cpf', { message: 'asdaa' });
      toast.error(
        "Erro ao atualizar pessoa. Verifique os dados e tente novamente.",
      );
    },
  });

  const onCancel = (): void => {
    navigate({ to: "/" });
  };

  const onSubmit = (data: PersonFormData): void => {
    updatePersonMutation.mutate({ id: Number(id), person: { ...data } });
  };

  return (
    <Fragment>
      {isLoading ? (
        <Backdrop open sx={{ zIndex: 9999 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      <PersonModal
        title="Edição de Pessoa Física"
        onCancel={onCancel}
        onSubmit={onSubmit}
      >
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
    </Fragment>
  );
}

export { PersonsUpdate };
