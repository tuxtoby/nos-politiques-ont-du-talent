import { ThemeProvider, CssBaseline, createTheme, CircularProgress, Box, Typography } from '@mui/material';
import Leaderboard from './views/leaderboard/Leaderboard';
import { useAuthInitialization } from './views/hooks/useAuthInitialization';
import { useSupabaseData } from './hooks/useSupabaseData';
import { StatsCards } from './views/leaderboard/components/StatsCards';

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
  },  
  title: {
    mb: 4,
    fontWeight: 'bold'
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

      <Typography variant="h4" sx={styles.title}>
        Nos Politiques Ont Du Talent
      </Typography>

      <StatsCards data={politicians} />
      <Leaderboard politicians={politicians} refetch={refetch} />
    </ThemeProvider>
  );
}

export default App;
