import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { TopThreeLeaders } from './components/TopThreeLeaders';
import { GlobalRankingTable } from './components/GlobalRankingTable';
import { LeaderboardHeader } from './components/LeaderboardHeader';
import { useLeaderboard } from './hooks/useLeaderboard';
import { ActionButton } from '../../components/ActionButton';
import { AddPoliticianDialog } from './components/AddPoliticianDialog';
import { AddSentenceDialog } from './components/AddSentenceDialog';
import { Politician } from '../../entities/Politician';

const styles = {
  container: {
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  toggleButtonContainer: {
    padding: '16px 24px',
    borderBottom: '1px solid #f0f0f0',
  },
  toggleButtonGroup: {
    '& .MuiToggleButton-root': {
      borderRadius: '4px',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.875rem',
      color: '#666',
      '&.Mui-selected': {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
      },
    },
  },
  topThreeSection: {
    padding: '24px',
    borderBottom: '1px solid #f0f0f0',
  },
  topThreeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  rankingSection: {
    padding: '24px',
  }
};

interface LeaderboardProps {
  politicians: Politician[];
  refetch: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ politicians, refetch }) => {
  const { displayMode, handleDisplayModeChange, leaderboardData, topThree } = useLeaderboard(politicians);
  const [openPoliticianDialog, setOpenPoliticianDialog] = useState(false);
  const [openSentenceDialog, setOpenSentenceDialog] = useState(false);
  
  const handleAddPolitician = () => {
    setOpenPoliticianDialog(true);
  };

  const handleAddSentence = () => {
    setOpenSentenceDialog(true);
  };

  const handlePoliticianDialogClose = () => {
    setOpenPoliticianDialog(false);
  };

  const handleSentenceDialogClose = () => {
    setOpenSentenceDialog(false);
  };

  const handlePoliticianAdded = () => {
    refetch();
  };

  const handleSentenceAdded = () => {
    refetch();
  };

  return (
    <Box sx={styles.container}>
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

      <Box sx={styles.topThreeSection}>
        <Box sx={styles.topThreeHeader}>
          <LeaderboardHeader title="Le top 3" />
        </Box>
        <TopThreeLeaders leaders={topThree} />
      </Box>

      <Box sx={styles.rankingSection}>
        <LeaderboardHeader title="Classement général" showSearch />
        <GlobalRankingTable leaderboardData={leaderboardData} />
      </Box>

      <ActionButton 
        onAddPolitician={handleAddPolitician}
        onAddSentence={handleAddSentence}
      />
      
      <AddPoliticianDialog
        open={openPoliticianDialog}
        onClose={handlePoliticianDialogClose}
        onSuccess={handlePoliticianAdded}
      />
      
      <AddSentenceDialog
        open={openSentenceDialog}
        onClose={handleSentenceDialogClose}
        onSuccess={handleSentenceAdded}
      />
    </Box>
  );
};

export default Leaderboard;
