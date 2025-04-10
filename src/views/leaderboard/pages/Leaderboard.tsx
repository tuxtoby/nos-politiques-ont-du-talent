import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { PoliticalFigure } from '../../../entities/PoliticalFigure';
import { StatsCards } from '../components/StatsCards';
import { TopThreeLeaders } from '../components/TopThreeLeaders';
import { GlobalRankingTable } from '../components/GlobalRankingTable';
import { LeaderboardHeader } from '../components/LeaderboardHeader';

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
  toggleButtonGroup: {
    mb: 2
  },
  toggleButtonContainer: {
    mb: 3
  },
  topThreeContainer: {
    mb: 4
  }
};

interface LeaderboardProps {
  data: PoliticalFigure[];
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const [displayMode, setDisplayMode] = useState<'general' | 'parti' | 'couleur'>('general');

  const handleDisplayModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'general' | 'parti' | 'couleur' | null,
  ) => {
    if (newMode !== null) {
      setDisplayMode(newMode);
    }
  };

  const processData = () => {
    if (displayMode === 'general') {
      return sortByScore([...data]);
    } else if (displayMode === 'parti') {
      return sortByScore(groupByParty(data));
    } else {
      return sortByScore(groupByPoliticalSide(data));
    }
  };

  const sortedPoliticians = processData();
  const topThree = sortedPoliticians.slice(0, 3);

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

      <Box sx={styles.topThreeContainer}>
        <LeaderboardHeader title="Le top 3" />
        <TopThreeLeaders leaders={topThree} />
      </Box>

      <Box>
        <LeaderboardHeader title="Classement général" showSearch />
        <GlobalRankingTable politicians={sortedPoliticians} />
      </Box>
    </Box>
  );
};

function sortByScore(politicians: PoliticalFigure[]): PoliticalFigure[] {
  return [...politicians].sort((a, b) => {
    const scoreA = a.fine + (a.sentenceDuration * 10000);
    const scoreB = b.fine + (b.sentenceDuration * 10000);
    return scoreB - scoreA;
  });
}

function groupByParty(data: PoliticalFigure[]): PoliticalFigure[] {
  const groupedData = data.reduce((acc, politician) => {
    const party = politician.party;
    if (!acc[party]) {
      acc[party] = createGroupEntry(party, politician);
    }
    updateGroupEntry(acc[party], politician);
    return acc;
  }, {} as Record<string, PoliticalFigure>);
  
  return Object.values(groupedData);
}

function groupByPoliticalSide(data: PoliticalFigure[]): PoliticalFigure[] {
  const groupedData = data.reduce((acc, politician) => {
    const side = politician.politicalSideName;
    if (!acc[side]) {
      acc[side] = createGroupEntry(side, politician);
    }
    updateGroupEntry(acc[side], politician);
    return acc;
  }, {} as Record<string, PoliticalFigure>);
  
  return Object.values(groupedData);
}

function createGroupEntry(key: string, politician: PoliticalFigure): PoliticalFigure {
  return {
    id: key,
    name: key,
    party: key,
    politicalSideName: politician.politicalSideName,
    politicalColor: politician.politicalColor,
    photo: '',
    charges: [],
    sentenceDuration: 0,
    fine: 0
  };
}

function updateGroupEntry(entry: PoliticalFigure, politician: PoliticalFigure): void {
  entry.sentenceDuration += politician.sentenceDuration;
  entry.fine += politician.fine;
  entry.charges = Array.from(new Set([...entry.charges, ...politician.charges]));
}

export default Leaderboard;
