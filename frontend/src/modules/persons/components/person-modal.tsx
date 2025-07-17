import type { PropsWithChildren, ReactElement } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface PersonModalProps<T> {
  onCancel?: () => void;
  onSubmit?: (data: T) => void;
  title: string;
}

function PersonModal<T>(props: PropsWithChildren<PersonModalProps<T>>): ReactElement {

  return (
    <Dialog open onClose={props.onCancel} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {props.title}
      </DialogTitle>

      <DialogContent dividers sx={{ position: 'relative' }}>
        {props.children}
      </DialogContent>

      <DialogActions sx={{ pr: 3, py: 2 }} >
        <Button onClick={props.onCancel} color="error" variant="outlined">
          Cancelar
        </Button>

        <Button type="submit" color="primary" variant="outlined">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export {
  PersonModal,
};
