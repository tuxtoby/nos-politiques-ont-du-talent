import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Group as GroupIcon, Flag as FlagIcon } from '@mui/icons-material';
import { Politician } from '../../../entities/Politician';
import { LeaderboardData } from '../adapters/LeaderboardData';

const styles = {
  container: {
    mb: 4
  },
  politiciansCard: {
    bgcolor: '#e8f5e9',
    height: '100%'
  },
  chargesCard: {
    bgcolor: '#e3f2fd',
    height: '100%'
  },
  cardContent: {
    textAlign: 'center'
  },
  politiciansIcon: {
    fontSize: 40,
    color: '#2e7d32',
    mb: 1
  },
  chargesIcon: {
    fontSize: 40,
    color: '#1976d2',
    mb: 1
  },
  boldText: {
    fontWeight: 'bold'
  }
};

interface StatsCardsProps {
  data: LeaderboardData[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const totalPoliticians = data.length;
  const totalCharges = data.reduce((acc, data) => acc + data.numberOfSentences, 0);

  return (
    <Grid container spacing={3} sx={styles.container}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Card sx={styles.politiciansCard}>
          <CardContent sx={styles.cardContent}>
            <GroupIcon sx={styles.politiciansIcon} />
            <Typography variant="h6">Nombre de personnalités politiques</Typography>
            <Typography variant="h4" sx={styles.boldText}>{totalPoliticians}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Card sx={styles.chargesCard}>
          <CardContent sx={styles.cardContent}>
            <FlagIcon sx={styles.chargesIcon} />
            <Typography variant="h6">Nombre de condamnations</Typography>
            <Typography variant="h4" sx={styles.boldText}>{totalCharges}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
