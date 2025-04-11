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
  Chip
} from '@mui/material';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { politicalColors } from '../../../constants/colors';
import { PoliticalSide } from '../../../entities/PoliticalSide';

const styles = {
  politicianBox: {
    display: 'flex', 
    alignItems: 'center'
  },
  avatar: {
    width: 75, 
    height: 75, 
    mr: 1
  }
};

interface GlobalRankingTableProps {
  leaderboardData: LeaderboardData[];
}

export const GlobalRankingTable: React.FC<GlobalRankingTableProps> = ({ leaderboardData }) => {
  const getAvatarBackgroundColor = (data: LeaderboardData) => {
    if (data.logo_url) return undefined;
    
    if ('id' in data.politicalEntity && typeof data.politicalEntity.id === 'number') {
      const politicalSide = data.politicalEntity as PoliticalSide;
      return politicalColors[politicalSide.id];
    }
    
    return '#808080'; // Default gray color for non-political side entities
  };

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
              <TableRow key={data.id}>
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
                <TableCell>{data.numberOfSentences}</TableCell>
                <TableCell>{data.totalPrisonTime} mois</TableCell>
                <TableCell>{data.totalFine.toLocaleString()} €</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
