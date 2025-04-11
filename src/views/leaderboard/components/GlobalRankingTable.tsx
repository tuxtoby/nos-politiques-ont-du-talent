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
                      sx={styles.avatar}
                      src={data.logo_url}
                    >
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
