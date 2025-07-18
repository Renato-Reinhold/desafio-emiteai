import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './router.js';
import { CssBaseline } from '@mui/material';
import React from 'react';

const container = document.getElementById('root');

const router = createRouter({
  routeTree
});

if (container) {
  const queryClient = new QueryClient();
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />

        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
