import React, { useState } from 'react';
import { Box, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { PoliticalFigure } from '../types/PoliticalFigure';
import { StatsCards } from './leaderboard/StatsCards';
import { TopThreeLeaders } from './leaderboard/TopThreeLeaders';
import { GlobalRankingTable } from './leaderboard/GlobalRankingTable';
import { LeaderboardHeader } from './leaderboard/LeaderboardHeader';
import { politicalColors } from '../constants/colors';

interface LeaderboardProps {
  data: PoliticalFigure[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  const [displayMode, setDisplayMode] = useState<'general' | 'parti' | 'couleur'>('general');

  const handleDisplayModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'general' | 'parti' | 'couleur' | null,
  ) => {
    if (newMode !== null) {
      setDisplayMode(newMode);
    }
  };

  // Process data based on display mode
  const processData = () => {
    if (displayMode === 'general') {
      return [...data].sort((a, b) => {
        const scoreA = a.fine + (a.sentenceDuration * 10000);
        const scoreB = b.fine + (b.sentenceDuration * 10000);
        return scoreB - scoreA;
      });
    } else if (displayMode === 'parti') {
      // Group by political party
      const groupedData = data.reduce((acc, politician) => {
        const party = politician.party;
        if (!acc[party]) {
          acc[party] = {
            id: party,
            name: party,
            party: party,
            politicalSideName: politician.politicalSideName,
            politicalColor: politician.politicalColor,
            photo: '',
            charges: [],
            sentenceDuration: 0,
            fine: 0
          };
        }
        acc[party].sentenceDuration += politician.sentenceDuration;
        acc[party].fine += politician.fine;
        acc[party].charges = Array.from(new Set([...acc[party].charges, ...politician.charges]));
        return acc;
      }, {} as Record<string, PoliticalFigure>);
      
      return Object.values(groupedData).sort((a, b) => {
        const scoreA = a.fine + (a.sentenceDuration * 10000);
        const scoreB = b.fine + (b.sentenceDuration * 10000);
        return scoreB - scoreA;
      });
    } else {
      // Group by political color
      const groupedData = data.reduce((acc, politician) => {
        const side = politician.politicalSideName;
        if (!acc[side]) {
          acc[side] = {
            id: side,
            name: side,
            party: side,
            politicalSideName: side,
            politicalColor: politician.politicalColor,
            photo: '',
            charges: [],
            sentenceDuration: 0,
            fine: 0
          };
        }
        acc[side].sentenceDuration += politician.sentenceDuration;
        acc[side].fine += politician.fine;
        acc[side].charges = Array.from(new Set([...acc[side].charges, ...politician.charges]));
        return acc;
      }, {} as Record<string, PoliticalFigure>);
      
      return Object.values(groupedData).sort((a, b) => {
        const scoreA = a.fine + (a.sentenceDuration * 10000);
        const scoreB = b.fine + (b.sentenceDuration * 10000);
        return scoreB - scoreA;
      });
    }
  };

  const sortedPoliticians = processData();
  const topThree = sortedPoliticians.slice(0, 3);

  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: '#f5f6fa' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Nos Politiques Ont Du Talent
      </Typography>

      <Box sx={{ mb: 3 }}>
        <ToggleButtonGroup
          value={displayMode}
          exclusive
          onChange={handleDisplayModeChange}
          aria-label="display mode"
          sx={{ mb: 2 }}
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

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
