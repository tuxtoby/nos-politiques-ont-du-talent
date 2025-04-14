import React, { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, useMediaQuery, useTheme } from '@mui/material';
import { TopThreeLeaders } from './components/TopThreeLeaders';
import { GlobalRankingTable } from './components/GlobalRankingTable';
import { LeaderboardHeader } from './components/LeaderboardHeader';
import { useLeaderboard } from './hooks/useLeaderboard';
import { ActionButton } from '../../components/ActionButton';
import { AddPoliticianDialog } from './components/AddDataDialog/AddPoliticianDialog';
import { AddSentenceDialog } from './components/AddDataDialog/AddSentenceDialog';
import { Politician } from '../../entities/Politician';
import { SentencesSidebar } from './components/Sidebar/SentencesSidebar';
import { LeaderboardData } from './adapters/LeaderboardData';

const styles = {
  container: {
    width: '100%',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  toggleButtonContainer: {
    padding: { xs: '12px 16px', sm: '16px 24px' },
    borderBottom: '1px solid #f0f0f0',
    overflowX: 'auto',
  },
  toggleButtonGroup: {
    '& .MuiToggleButton-root': {
      borderRadius: '4px',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: { xs: '0.75rem', sm: '0.875rem' },
      color: '#666',
      padding: { xs: '6px 8px', sm: '8px 12px' },
      minWidth: { xs: '60px', sm: 'auto' },
      '&.Mui-selected': {
        backgroundColor: '#e3f2fd',
        color: '#1976d2',
      },
    },
  },
  topThreeSection: {
    padding: { xs: '16px', sm: '24px' },
    borderBottom: '1px solid #f0f0f0',
  },
  topThreeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  rankingSection: {
    padding: { xs: '16px', sm: '24px' },
  }
};

interface LeaderboardProps {
  politicians: Politician[];
  refetch: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ politicians, refetch }) => {
  const { 
    displayMode, 
    handleDisplayModeChange, 
    leaderboardData, 
    topThree,
    searchQuery,
    setSearchQuery
  } = useLeaderboard(politicians);
  
  const [openPoliticianDialog, setOpenPoliticianDialog] = useState(false);
  const [openSentenceDialog, setOpenSentenceDialog] = useState(false);
  const [selectedData, setSelectedData] = useState<LeaderboardData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
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

  const handleLeaderboardItemClick = (data: LeaderboardData) => {
    setSelectedData(data);
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
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
          size={isMobile ? "small" : "medium"}
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
        <TopThreeLeaders 
          leaders={topThree} 
          onLeaderClick={handleLeaderboardItemClick}
        />
      </Box>

      <Box sx={styles.rankingSection}>
        <LeaderboardHeader 
          title="Classement général" 
          showSearch 
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <GlobalRankingTable 
          leaderboardData={leaderboardData} 
          onRowClick={handleLeaderboardItemClick}
        />
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

      <SentencesSidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        selectedData={selectedData}
        allPoliticians={politicians}
      />
    </Box>
  );
};

export default Leaderboard;
