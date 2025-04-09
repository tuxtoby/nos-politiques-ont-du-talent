import React from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import Leaderboard from './components/Leaderboard';
import { PoliticalFigure } from './types';

// Sample data
const sampleData: PoliticalFigure[] = [
  {
    id: '1',
    name: 'John Doe',
    party: 'Party A',
    politicalColor: '#FF0000',
    country: 'Country X',
    sentenceDate: '2024-01-15',
    sentenceDuration: 24,
    charges: ['Corruption', 'Fraud'],
    status: 'sentenced',
  },
  {
    id: '2',
    name: 'Jane Smith',
    party: 'Party B',
    politicalColor: '#0000FF',
    country: 'Country Y',
    sentenceDate: '2024-02-20',
    sentenceDuration: 36,
    charges: ['Embezzlement'],
    status: 'appealing',
  },
  // Add more sample data as needed
];

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
      <Leaderboard data={sampleData} />
    </ThemeProvider>
  );
}

export default App;
