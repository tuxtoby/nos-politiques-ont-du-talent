import React from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { PoliticalFigure } from '../../types/PoliticalFigure';
import { StatsCards } from './components/StatsCards';
import { TopThreeLeaders } from './components/TopThreeLeaders';
import { GlobalRankingTable } from './components/GlobalRankingTable';
import { LeaderboardHeader } from './components/LeaderboardHeader';
import { useLeaderboard } from './hooks/useLeaderboard';

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
  }
};

interface LeaderboardProps {
  data: PoliticalFigure[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const { displayMode, handleDisplayModeChange, sortedPoliticians, topThree } = useLeaderboard(data);

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
      
      <StatsCards data={data} />

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
