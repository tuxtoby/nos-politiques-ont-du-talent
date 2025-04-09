import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Leaderboard from './components/Leaderboard';
import { data } from './data/data';
import type { PoliticalFigure } from './types/PoliticalFigure';
import type { Politician, Sentence } from './types/Politician';

const politicalColors: { [key: string]: string } = {
  'far-right': '#000000',
  'right': '#0000FF',
  'center': '#FFA500',
  'left': '#FF69B4',
  'far-left': '#FF0000'
};

const transformedData: PoliticalFigure[] = data.map((politician: Politician, index: number) => {
 return {
    id: String(index + 1),
    name: politician.name,
    party: politician.politicalGroup,
    politicalColor: politicalColors[politician.politicalSide],
    photo: politician.photo,
    charges: politician.sentences.map(s => s.type),
    sentenceDuration: politician.sentences.reduce((total: number, s: Sentence) => total + s.prisonTime, 0),
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
