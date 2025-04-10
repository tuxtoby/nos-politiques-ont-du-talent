import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { data } from './domains/political/data';
import { transformPoliticians } from './services/politicianService';
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
  const transformedData = transformPoliticians(data);
  
  return (
    <ThemeProvider theme={styles.theme}>
      <CssBaseline />
      <Leaderboard data={transformedData} />
    </ThemeProvider>
  );
}

export default App;
