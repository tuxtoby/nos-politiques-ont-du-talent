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
import { PoliticalFigure } from '../../types';

interface GlobalRankingTableProps {
  politicians: PoliticalFigure[];
}

export const GlobalRankingTable: React.FC<GlobalRankingTableProps> = ({ politicians }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Politician</TableCell>
            <TableCell>Total Charges</TableCell>
            <TableCell>Prison Time</TableCell>
            <TableCell>Total Fine</TableCell>
            <TableCell>Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {politicians.map((politician, index) => {
            const score = politician.fine + (politician.sentenceDuration * 10000);
            return (
              <TableRow key={politician.id}>
                <TableCell>
                  <Chip 
                    label={index + 1} 
                    size="small"
                    color={index < 3 ? 'primary' : undefined}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      sx={{ 
                        width: 32, 
                        height: 32, 
                        mr: 1,
                        bgcolor: politician.politicalColor
                      }}
                    >
                      {politician.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">{politician.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {politician.party}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{politician.charges.length}</TableCell>
                <TableCell>{politician.sentenceDuration} months</TableCell>
                <TableCell>€{politician.fine.toLocaleString()}</TableCell>
                <TableCell>{score.toLocaleString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
