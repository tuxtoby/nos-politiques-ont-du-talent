import React from 'react';
import { Card, CardContent, Typography, useMediaQuery, useTheme, Box } from '@mui/material';
import { Group as GroupIcon, Flag as FlagIcon } from '@mui/icons-material';
import { Politician } from '../../../entities/Politician';

const styles = {
  container: {
    mb: 4,
    display: 'flex',
    flexWrap: 'wrap',
    margin: { xs: -1, sm: -2 },
  },
  politiciansCard: {
    bgcolor: '#e8f5e9',
    height: '100%',
  },
  chargesCard: {
    bgcolor: '#e3f2fd',
    height: '100%',
  },
  cardContent: {
    textAlign: 'center',
    padding: { xs: 2, sm: 3 },
  },
  politiciansIcon: {
    fontSize: { xs: 30, sm: 40 },
    color: '#2e7d32',
    mb: 1,
  },
  chargesIcon: {
    fontSize: { xs: 30, sm: 40 },
    color: '#1976d2',
    mb: 1,
  },
  cardTitle: {
    fontSize: { xs: '1rem', sm: '1.25rem' },
    fontWeight: 'medium',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: { xs: '1.5rem', sm: '2.125rem' },
  },
  politiciansGridItem: {
    width: { xs: '100%', sm: '66.67%' },
    padding: { xs: 1, sm: 2 },
  },
  chargesGridItem: {
    width: { xs: '100%', sm: '33.33%' },
    padding: { xs: 1, sm: 2 },
  },
};

interface StatsCardsProps {
  data: Politician[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const totalPoliticians = data.length;
  const totalCharges = data.reduce((acc, data) => acc + data.sentences.length, 0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={styles.container}>
      <Box sx={styles.politiciansGridItem}>
        <Card sx={styles.politiciansCard}>
          <CardContent sx={styles.cardContent}>
            <GroupIcon sx={styles.politiciansIcon} />
            <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={styles.cardTitle}>
              Nombre de personnalités politiques
            </Typography>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={styles.boldText}>
              {totalPoliticians}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={styles.chargesGridItem}>
        <Card sx={styles.chargesCard}>
          <CardContent sx={styles.cardContent}>
            <FlagIcon sx={styles.chargesIcon} />
            <Typography variant={isMobile ? 'subtitle1' : 'h6'} sx={styles.cardTitle}>
              Nombre de condamnations
            </Typography>
            <Typography variant={isMobile ? 'h5' : 'h4'} sx={styles.boldText}>
              {totalCharges}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
