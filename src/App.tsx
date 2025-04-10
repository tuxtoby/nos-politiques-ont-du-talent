import { ThemeProvider, CssBaseline, createTheme, CircularProgress, Box } from '@mui/material';
import Leaderboard from './views/leaderboard/Leaderboard';
import { useAuthInitialization } from './views/hooks/useAuthInitialization';

const styles = {
  theme: createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  }),
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  }
};

function App() {
  const { authInitialized, loading } = useAuthInitialization();

  if (loading) {
    return (
      <ThemeProvider theme={styles.theme}>
        <CssBaseline />
        <Box sx={styles.loading}>
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  if (!authInitialized) {
    return (
      <ThemeProvider theme={styles.theme}>
        <CssBaseline />
        <Box sx={styles.loading}>
          <div>Authentication failed. Please try again later.</div>
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={styles.theme}>
      <CssBaseline />
      <Leaderboard />
    </ThemeProvider>
  );
}

export default App;
