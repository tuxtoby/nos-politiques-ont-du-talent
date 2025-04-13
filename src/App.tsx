import { ThemeProvider, CssBaseline, createTheme, CircularProgress, Box, Container } from '@mui/material';
import Leaderboard from './views/leaderboard/Leaderboard';
import { useAuthInitialization } from './views/hooks/useAuthInitialization';
import { useSupabaseData } from './hooks/useSupabaseData';
import { StatsCards } from './views/leaderboard/components/StatsCards';
import Header from './components/Header';

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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
  }),
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
  },
  container: {
    padding: { xs: '8px', sm: '16px 24px' },
    backgroundColor: '#f5f6fa',
    minHeight: '100vh',
  },
};

function App() {
  const { authInitialized, loading } = useAuthInitialization();
  const { politicians, supabaseLoading, refetch } = useSupabaseData();

  if (loading || supabaseLoading) {
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
      <Box sx={styles.container}>
        <Container maxWidth="lg" disableGutters>
          <Header />
          <StatsCards data={politicians} />
          <Leaderboard politicians={politicians} refetch={refetch} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
