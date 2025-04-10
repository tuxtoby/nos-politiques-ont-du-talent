import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton, CircularProgress } from '@mui/material';
import { StatsCards } from './components/StatsCards';
import { TopThreeLeaders } from './components/TopThreeLeaders';
import { GlobalRankingTable } from './components/GlobalRankingTable';
import { LeaderboardHeader } from './components/LeaderboardHeader';
import { useLeaderboard } from './hooks/useLeaderboard';
import { useSupabaseData } from '../../hooks/useSupabaseData';

const styles = {
  container: {
    width: '100%',
    p: 3,
    bgcolor: '#f5f6fa'
  },
  title: {
    mb: 4,
    fontWeight: 'bold'
  },
  toggleButtonContainer: {
    mb: 3
  },
  toggleButtonGroup: {
    mb: 2
  },
  topThreeSection: {
    mb: 4
  },
  topThreeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh'
  },
  errorMessage: {
    color: 'error.main',
    textAlign: 'center',
    my: 4
  }
};

const Leaderboard: React.FC = () => {
  const { politicalFigures, loading, error } = useSupabaseData();
  const { displayMode, handleDisplayModeChange, sortedPoliticians, topThree } = useLeaderboard(politicalFigures);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={styles.container}>
        <Typography variant="h5" sx={styles.errorMessage}>
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" sx={styles.title}>
        Nos Politiques Ont Du Talent
      </Typography>

      <Box sx={styles.toggleButtonContainer}>
        <ToggleButtonGroup
          value={displayMode}
          exclusive
          onChange={handleDisplayModeChange}
          aria-label="display mode"
          sx={styles.toggleButtonGroup}
        >
          <ToggleButton value="general" aria-label="general view">
            Général
          </ToggleButton>
          <ToggleButton value="parti" aria-label="party view">
            Parti Politique
          </ToggleButton>
          <ToggleButton value="couleur" aria-label="political color view">
            Couleur Politique
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      
      <StatsCards data={politicalFigures} />

      <Box sx={styles.topThreeSection}>
        <Box sx={styles.topThreeHeader}>
          <LeaderboardHeader title="Le top 3" />
        </Box>
        <TopThreeLeaders leaders={topThree} />
      </Box>

      <Box>
        <LeaderboardHeader title="Classement général" showSearch />
        <GlobalRankingTable politicians={sortedPoliticians} />
      </Box>
    </Box>
  );
};

export default Leaderboard;
