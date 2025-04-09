import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { PoliticalFigure, PartyStats } from '../types';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'party', headerName: 'Party', flex: 1 },
  { field: 'country', headerName: 'Country', flex: 1 },
  { field: 'sentenceDate', headerName: 'Sentence Date', flex: 1 },
  { 
    field: 'sentenceDuration',
    headerName: 'Sentence (Months)',
    flex: 1,
    type: 'number'
  },
  { field: 'status', headerName: 'Status', flex: 1 },
];

interface LeaderboardProps {
  data: PoliticalFigure[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const calculatePartyStats = (): PartyStats[] => {
    const partyMap = new Map<string, PartyStats>();
    
    data.forEach(figure => {
      const stats = partyMap.get(figure.party) || {
        partyName: figure.party,
        totalCases: 0,
        averageSentence: 0,
        totalPoliticians: 0,
      };
      
      stats.totalCases++;
      stats.averageSentence = ((stats.averageSentence * (stats.totalCases - 1)) + figure.sentenceDuration) / stats.totalCases;
      stats.totalPoliticians++;
      
      partyMap.set(figure.party, stats);
    });

    return Array.from(partyMap.values());
  };

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Political Sentences Leaderboard
      </Typography>
      
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Individual Cases" />
          <Tab label="Party Statistics" />
          <Tab label="Yearly Overview" />
        </Tabs>

        <Box sx={{ p: 2 }}>
          {tabValue === 0 && (
            <DataGrid
              rows={data}
              columns={columns}
              autoHeight
              pageSizeOptions={[5, 10, 25]}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
            />
          )}
          
          {tabValue === 1 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
              {calculatePartyStats().map((stats) => (
                <Card key={stats.partyName}>
                  <CardContent>
                    <Typography variant="h6">{stats.partyName}</Typography>
                    <Typography>Total Cases: {stats.totalCases}</Typography>
                    <Typography>Average Sentence: {stats.averageSentence.toFixed(1)} months</Typography>
                    <Typography>Total Politicians: {stats.totalPoliticians}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
          
          {tabValue === 2 && (
            <Typography variant="body1">
              Yearly statistics visualization will be implemented here
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Leaderboard;
