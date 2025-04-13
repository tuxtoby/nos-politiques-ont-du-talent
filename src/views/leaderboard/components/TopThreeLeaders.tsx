import React from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography, Stack } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { politicalColors } from '../../../constants/colors';
import { PoliticalSide } from '../../../entities/PoliticalSide';
import { SentencesChip, PrisonTimeChip, FineChip } from '../../../components';

const styles = {
  card: {
    borderRadius: 5, 
    boxShadow: 2
  },
  clickableCard: {
    borderRadius: 5, 
    boxShadow: 2,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 3
    }
  },
  profileBox: {
    display: 'flex', 
    alignItems: 'center', 
    mb: 2
  },
  avatar: {
    width: 90, 
    height: 90
  },
  infoBox: {
    ml: 2
  },
  trophyIcon: {
    ml: 'auto',
    width: 50,
    height: 50
  },
  statsContainer: {
    textAlign: 'center'
  },
  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 1,
    mt: 2
  }
};

interface TopThreeLeadersProps {
  leaders: LeaderboardData[];
  onLeaderClick?: (leader: LeaderboardData) => void;
}

export const TopThreeLeaders: React.FC<TopThreeLeadersProps> = ({ 
  leaders,
  onLeaderClick
}) => {
  const getTrophyColor = (index: number) => {
    switch(index) {
      case 0: return '#FFD700';
      case 1: return '#C0C0C0';
      case 2: return '#CD7F32';
      default: return 'inherit';
    }
  };

  const getAvatarBackgroundColor = (leader: LeaderboardData) => {
    if (leader.logo_url) return undefined;
    
    if ('id' in leader.politicalEntity && typeof leader.politicalEntity.id === 'number') {
      const politicalSide = leader.politicalEntity as PoliticalSide;
      return politicalColors[politicalSide.id];
    }
    
    return '#808080'; // Default gray color for non-political side entities
  };

  const handleCardClick = (leader: LeaderboardData) => {
    if (onLeaderClick) {
      onLeaderClick(leader);
    }
  };

  return (
    <Grid container spacing={5}>
      {leaders.map((leader, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={leader.id}>
          <Card 
            sx={onLeaderClick ? styles.clickableCard : styles.card}
            onClick={() => onLeaderClick && handleCardClick(leader)}
          >
            <CardContent>
              <Box sx={styles.profileBox}>
                <Avatar
                  sx={{
                    ...styles.avatar,
                    bgcolor: getAvatarBackgroundColor(leader)
                  }}
                  src={leader.logo_url}
                >
                  {!leader.logo_url && leader.name.charAt(0)}
                </Avatar>
                <Box sx={styles.infoBox}>
                  <Typography variant="h6">{leader.name}</Typography>
                  <Typography color="textSecondary">{leader.caption}</Typography>
                </Box>
                <TrophyIcon sx={{
                  ...styles.trophyIcon,
                  color: getTrophyColor(index)
                }} />
              </Box>
              <Stack sx={styles.chipsContainer} direction="row" spacing={1}>
                <SentencesChip count={leader.numberOfSentences} />
                <PrisonTimeChip months={leader.totalPrisonTime} />
                <FineChip amount={leader.totalFine} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
