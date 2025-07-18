import { Box } from '@mui/material';
import React, { PropsWithChildren, ReactElement } from 'react';

function Page(props: PropsWithChildren): ReactElement {
  return (
    <Box sx={{ flexGrow: 1, p: 2, py: 0 }}>
      {props.children}
    </Box>
  );
}

export {
  Page,
}
