import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PoliticalFigure } from '../types/PoliticalFigure';
import { StatsCards } from './leaderboard/StatsCards';
import { TopThreeLeaders } from './leaderboard/TopThreeLeaders';
import { GlobalRankingTable } from './leaderboard/GlobalRankingTable';
import { LeaderboardHeader } from './leaderboard/LeaderboardHeader';

interface LeaderboardProps {
  data: PoliticalFigure[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ data }) => {
  // Sort politicians by total fines and prison time
  const sortedPoliticians = [...data].sort((a, b) => {
    const scoreA = a.fine + (a.sentenceDuration * 10000);
    const scoreB = b.fine + (b.sentenceDuration * 10000);
    return scoreB - scoreA;
  });

  const topThree = sortedPoliticians.slice(0, 3);

  return (
    <Box sx={{ width: '100%', p: 3, bgcolor: '#f5f6fa' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Nos Politiques Ont Du Talent
      </Typography>
      
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
