import React from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Avatar,
  Typography,
  Chip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { politicalColors } from '../../../constants/colors';
import { PoliticalSide } from '../../../entities/PoliticalSide';
import { SentencesChip, PrisonTimeChip, FineChip } from '../../../components';

const styles = {
  politicianBox: {
    display: 'flex', 
    alignItems: 'center'
  },
  avatar: {
    width: { xs: 50, sm: 75 }, 
    height: { xs: 50, sm: 75 }, 
    mr: 1
  },
  clickableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  },
  mobileCard: {
    mb: 2,
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: 3
    },
    position: 'relative'
  },
  rankChip: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    transition: 'none'
  },
  mobileCardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    paddingTop: 3,
    position: 'relative',
    zIndex: 0
  },
  mobileProfileBox: {
    display: 'flex',
    alignItems: 'center',
    mb: 2
  },
  mobileInfoBox: {
    ml: 2,
    overflow: 'hidden'
  },
  mobileName: {
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  mobileCaption: {
    fontSize: '0.75rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  mobileChipsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  }
};

interface GlobalRankingTableProps {
  leaderboardData: LeaderboardData[];
  onRowClick?: (data: LeaderboardData) => void;
}

export const GlobalRankingTable: React.FC<GlobalRankingTableProps> = ({ 
  leaderboardData,
  onRowClick 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getAvatarBackgroundColor = (data: LeaderboardData) => {
    if (data.logo_url) return undefined;
    
    if ('id' in data.politicalEntity && typeof data.politicalEntity.id === 'number') {
      const politicalSide = data.politicalEntity as PoliticalSide;
      return politicalColors[politicalSide.id];
    }
    
    return '#808080'; // Default gray color for non-political side entities
  };

  const handleRowClick = (data: LeaderboardData) => {
    if (onRowClick) {
      onRowClick(data);
    }
  };

  if (isMobile) {
    return (
      <Box>
        {leaderboardData.map((data, index) => (
          <Card 
            key={data.id}
            sx={styles.mobileCard}
            onClick={() => handleRowClick(data)}
          >
            <Chip 
              label={index + 1} 
              size="small"
              color={index < 3 ? 'primary' : undefined}
              sx={styles.rankChip}
            />
            <CardContent sx={styles.mobileCardContent}>
              <Box sx={styles.mobileProfileBox}>
                <Avatar
                  sx={{
                    ...styles.avatar,
                    bgcolor: getAvatarBackgroundColor(data)
                  }}
                  src={data.logo_url}
                >
                  {!data.logo_url && data.name.charAt(0)}
                </Avatar>
                <Box sx={styles.mobileInfoBox}>
                  <Typography variant="h6" sx={styles.mobileName}>{data.name}</Typography>
                  <Typography variant="caption" sx={styles.mobileCaption}>
                    {data.caption}
                  </Typography>
                </Box>
              </Box>
              <Stack sx={styles.mobileChipsContainer} spacing={1}>
                <SentencesChip count={data.numberOfSentences} size="small" />
                <PrisonTimeChip months={data.totalPrisonTime} size="small" />
                <FineChip amount={data.totalFine} size="small" />
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rang</TableCell>
            <TableCell>Personnalité politique</TableCell>
            <TableCell>Nombre de condamnations</TableCell>
            <TableCell>Temps en prison requis</TableCell>
            <TableCell>Total d'amendes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaderboardData.map((data, index) => {
            return (
              <TableRow 
                key={data.id}
                onClick={() => handleRowClick(data)}
                sx={onRowClick ? styles.clickableRow : undefined}
              >
                <TableCell>
                  <Chip 
                    label={index + 1} 
                    size="small"
                    color={index < 3 ? 'primary' : undefined}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={styles.politicianBox}>
                    <Avatar
                      sx={{
                        ...styles.avatar,
                        bgcolor: getAvatarBackgroundColor(data)
                      }}
                      src={data.logo_url}
                    >
                      {!data.logo_url && data.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{data.name}</Typography>
                      <Typography variant="caption">
                        {data.caption}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <SentencesChip count={data.numberOfSentences}/>
                </TableCell>
                <TableCell>
                  <PrisonTimeChip months={data.totalPrisonTime}/>
                </TableCell>
                <TableCell>
                  <FineChip amount={data.totalFine}/>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
