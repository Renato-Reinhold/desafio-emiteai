import React, { ReactElement } from 'react';

import { Box, Stack, Typography } from '@mui/material';
import type { Button } from '@mui/material';

interface PageHeaderProps {
  title: string;
  actions?: ReactElement<typeof Button>[];
}

function PageHeader(props: PageHeaderProps): ReactElement {
  const { title, actions } = props;

  return (
    <Box
      sx={{
        py: 2,
        mb: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box>
        <Typography variant="h4" component="h1">
          {title}
        </Typography>
      </Box>

      <Stack direction="row" spacing={1}>
        {actions}
      </Stack>
    </Box>
  );
}

export {
  PageHeader
};
