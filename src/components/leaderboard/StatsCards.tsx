import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { Group as GroupIcon, Flag as FlagIcon } from '@mui/icons-material';
import { PoliticalFigure } from '../../types';

interface StatsCardsProps {
  data: PoliticalFigure[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const totalPoliticians = data.length;
  const totalCharges = data.reduce((acc, figure) => acc + figure.charges.length, 0);

  return (
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
  );
};
