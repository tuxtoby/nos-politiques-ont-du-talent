import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Leaderboard from './components/Leaderboard';
import { data } from './data/data';
import type { PoliticalFigure } from './types';
import type { Politician, Sentence } from './types/data';

// Map political sides to colors
const politicalColors: { [key: string]: string } = {
  'far-right': '#000000',
  'right': '#0000FF',
  'center': '#FFA500',
  'left': '#FF69B4',
  'far-left': '#FF0000'
};

// Transform the data from data.jsonc to match the expected format
const transformedData: PoliticalFigure[] = data.map((politician: Politician, index: number) => {
  // Get the most recent sentence
  const mostRecentSentence = politician.sentences.reduce((latest: Sentence, current: Sentence) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, politician.sentences[0]);

  return {
    id: String(index + 1),
    name: politician.name,
    party: politician['political-group'],
    politicalColor: politicalColors[politician['political-side']] || '#808080',
    country: 'France', // All politicians are from France
    sentenceDate: mostRecentSentence.date,
    sentenceDuration: mostRecentSentence['prison-time'],
    charges: politician.sentences.map((s: Sentence) => s.type),
    status: 'sentenced', // Default status since we don't have this info in the data
    fine: politician.sentences.reduce((total: number, s: Sentence) => total + s.fine, 0)
  };
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Leaderboard data={transformedData} />
    </ThemeProvider>
  );
}

export default App;
