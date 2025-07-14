import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./routes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import CssBaseline from "@mui/material/CssBaseline";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <StyledThemeProvider theme={theme}>
          <CssBaseline />
          <RouterProvider router={router}></RouterProvider>
        </StyledThemeProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
