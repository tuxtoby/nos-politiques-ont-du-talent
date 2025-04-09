import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ButtonGroup,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import { Search as SearchIcon, EmojiEvents as TrophyIcon, Group as GroupIcon, Flag as FlagIcon } from '@mui/icons-material';
import { PoliticalFigure } from '../types';

interface LeaderboardProps {
  data: PoliticalFigure[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const [timeFilter, setTimeFilter] = useState<'Today' | 'Week' | 'Month'>('Today');
  
  // Calculate total stats
  const totalPoliticians = data.length;
  const totalCharges = data.reduce((acc, figure) => acc + figure.charges.length, 0);

  // Sort politicians by total fines and prison time
  const sortedPoliticians = [...data].sort((a, b) => {
    const scoreA = a.fine + (a.sentenceDuration * 10000); // Weight prison time more heavily
    const scoreB = b.fine + (b.sentenceDuration * 10000);
    return scoreB - scoreA;
  });

  const topThree = sortedPoliticians.slice(0, 3);

  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: '#f5f6fa' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Leaderboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <GroupIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
              <Typography variant="h6">Registered Politicians</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalPoliticians}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <FlagIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h6">Total Charges</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{totalCharges}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Current Leaders */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Current Leaders</Typography>
          <ButtonGroup variant="outlined" size="small">
            <Button 
              variant={timeFilter === 'Week' ? 'contained' : 'outlined'}
              onClick={() => setTimeFilter('Week')}
            >
              Week
            </Button>
            <Button 
              variant={timeFilter === 'Month' ? 'contained' : 'outlined'}
              onClick={() => setTimeFilter('Month')}
            >
              Month
            </Button>
            <Button 
              variant={timeFilter === 'Today' ? 'contained' : 'outlined'}
              onClick={() => setTimeFilter('Today')}
            >
              Today
            </Button>
          </ButtonGroup>
        </Box>

        <Grid container spacing={3}>
          {topThree.map((politician, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={politician.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                      sx={{ 
                        width: 60, 
                        height: 60,
                        bgcolor: politician.politicalColor
                      }}
                    >
                      {politician.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ ml: 2 }}>
                      <Typography variant="h6">{politician.name}</Typography>
                      <Typography color="textSecondary">{politician.party}</Typography>
                    </Box>
                    {index === 0 && <TrophyIcon sx={{ ml: 'auto', color: '#FFD700' }} />}
                    {index === 1 && <TrophyIcon sx={{ ml: 'auto', color: '#C0C0C0' }} />}
                    {index === 2 && <TrophyIcon sx={{ ml: 'auto', color: '#CD7F32' }} />}
                  </Box>
                  <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                    <Grid size={{ xs: 4}}>
                      <Typography variant="h6">{politician.charges.length}</Typography>
                      <Typography variant="caption">CHARGES</Typography>
                    </Grid>
                    <Grid size={{ xs: 4}}>
                      <Typography variant="h6">{politician.sentenceDuration}</Typography>
                      <Typography variant="caption">MONTHS</Typography>
                    </Grid>
                    <Grid size={{ xs: 4}}>
                      <Typography variant="h6">{(politician.fine / 1000).toFixed(0)}K</Typography>
                      <Typography variant="caption">FINE (€)</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Global Ranking */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Global Ranking</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search by user name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Politician</TableCell>
                <TableCell>Total Charges</TableCell>
                <TableCell>Prison Time</TableCell>
                <TableCell>Total Fine</TableCell>
                <TableCell>Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedPoliticians.map((politician, index) => {
                const score = politician.fine + (politician.sentenceDuration * 10000);
                return (
                  <TableRow key={politician.id}>
                    <TableCell>
                      <Chip 
                        label={index + 1} 
                        size="small"
                        color={index < 3 ? 'primary' : undefined}
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            mr: 1,
                            bgcolor: politician.politicalColor
                          }}
                        >
                          {politician.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{politician.name}</Typography>
                          <Typography variant="caption" color="textSecondary">
                            {politician.party}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{politician.charges.length}</TableCell>
                    <TableCell>{politician.sentenceDuration} months</TableCell>
                    <TableCell>{politician.fine.toLocaleString()}€</TableCell>
                    <TableCell>{score.toLocaleString()}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Leaderboard;
