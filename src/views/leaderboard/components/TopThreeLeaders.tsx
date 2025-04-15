import React from 'react';
import { Card, CardContent, Box, Avatar, Typography, Stack, useMediaQuery, useTheme } from '@mui/material';
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
    width: { xs: 60, sm: 90 }, 
    height: { xs: 60, sm: 90 }
  },
  infoBox: {
    ml: 2,
    overflow: 'hidden'
  },
  name: {
    fontSize: { xs: '1rem', sm: '1.25rem' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  caption: {
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  trophyIcon: {
    ml: 'auto',
    width: { xs: 30, sm: 50 },
    height: { xs: 30, sm: 50 }
  },
  statsContainer: {
    textAlign: 'center'
  },
  chipsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 1,
    mt: 2,
    '& > *:nth-of-type(3)': {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 1
    }
  },
  gridItem: {
    width: { xs: '100%', sm: '33.33%' },
    padding: { xs: 1, sm: 2 }
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
    <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: { xs: -1, sm: -2 } }}>
      {leaders.map((leader, index) => (
        <Box key={leader.id} sx={styles.gridItem}>
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
                  <Typography variant="h6" sx={styles.name}>{leader.name}</Typography>
                  <Typography color="textSecondary" sx={styles.caption}>{leader.caption}</Typography>
                </Box>
                <TrophyIcon sx={{
                  ...styles.trophyIcon,
                  color: getTrophyColor(index)
                }} />
              </Box>
              <Stack 
                sx={styles.chipsContainer} 
                direction={isMobile ? "column" : "row"} 
                spacing={1}
                alignItems="center"
                useFlexGap
              >
                <SentencesChip count={leader.numberOfSentences} size={isMobile ? "small" : "medium"} />
                <PrisonTimeChip months={leader.totalPrisonTime} size={isMobile ? "small" : "medium"} />
                <Box sx={{ width: '100%', display: isMobile ? 'none' : 'block', height: 0 }}></Box>
                <FineChip amount={leader.totalFine} size={isMobile ? "small" : "medium"} />
              </Stack>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};
