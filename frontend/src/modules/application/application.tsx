import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { Outlet } from '@tanstack/react-router';
import { Toaster } from 'sonner';
import { ReportsManager } from '../../components/report-manager';

function Application() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Emiteaí - Tech Challenge
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />

        <Toaster expand position="top-right" />
      </Box>

      <Box component="footer" sx={{ py: 2, backgroundColor: 'background.paper' }}>
        <Typography variant="body2" align="center" color="text.secondary">
            © {new Date().getFullYear()}
        </Typography>
      </Box>

      <ReportsManager />
    </Box>
  );
}

export {
  Application,
};
