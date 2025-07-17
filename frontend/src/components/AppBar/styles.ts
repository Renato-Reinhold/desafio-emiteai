// components/AppBar/styles.ts
import styled from "styled-components";
import { Toolbar } from "@mui/material";
import { alpha } from "@mui/material/styles";

export const StyledToolbar = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  border-radius: ${({ theme }) => `calc(${theme.shape.borderRadius}px + 8px)`};
  backdrop-filter: blur(24px);
  border: 1px solid ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) =>
    theme.vars
      ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
      : alpha(theme.palette.background.default, 0.4)};
  box-shadow: ${({ theme }) => theme.shadows[1]};
  padding: 8px 12px;
`;
