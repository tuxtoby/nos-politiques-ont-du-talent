import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  CircularProgress,
  Box,
  Container,
} from '@mui/material';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import Leaderboard from './views/leaderboard/Leaderboard';
import { useAuthInitialization } from './views/hooks/useAuthInitialization';
import { useSupabaseData } from './hooks/useSupabaseData';
import { StatsCards } from './views/leaderboard/components/StatsCards';
import Header from './components/Header';
import { findPoliticianBySimplifiedName } from './services/politicianService';

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

function MainApp() {
  const { simplifiedName } = useParams<{ simplifiedName?: string }>();
  const { politicians, supabaseLoading, refetch } = useSupabaseData();
  const { authInitialized, loading } = useAuthInitialization();

  if (loading || supabaseLoading) {
    return (
      <Box sx={styles.loading}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authInitialized) {
    return (
      <Box sx={styles.loading}>
        <div>Authentication failed. Please try again later.</div>
      </Box>
    );
  }

  // Find the politician by simplified_name if it exists in the URL
  const initialSelectedPolitician = simplifiedName 
    ? findPoliticianBySimplifiedName(politicians, simplifiedName) 
    : undefined;

  return (
    <Box sx={styles.container}>
      <Container maxWidth="lg" disableGutters>
        <Header />
        <StatsCards data={politicians} />
        <Leaderboard 
          politicians={politicians} 
          refetch={refetch} 
          initialSelectedPolitician={initialSelectedPolitician}
        />
      </Container>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={styles.theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/:simplifiedName" element={<MainApp />} />
          <Route path="/" element={<MainApp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
