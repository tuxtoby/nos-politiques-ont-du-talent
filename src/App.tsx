import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Leaderboard from './views/leaderboard/Leaderboard';

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
  })
};

function App() {
  return (
    <ThemeProvider theme={styles.theme}>
      <CssBaseline />
      <Leaderboard />
    </ThemeProvider>
  );
}

export default App;
