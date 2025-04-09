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
import { PoliticalFigure } from '../../types/PoliticalFigure';

interface GlobalRankingTableProps {
  politicians: PoliticalFigure[];
}

export const GlobalRankingTable: React.FC<GlobalRankingTableProps> = ({ politicians }) => {
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
          {politicians.map((politician, index) => {
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
                        width: 75, 
                        height: 75, 
                        mr: 1,
                        bgcolor: politician.photo ? 'transparent' : politician.politicalColor
                      }}
                      src={politician.photo}
                    >
                      {!politician.photo && politician.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{politician.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {politician.party}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{politician.charges.length}</TableCell>
                <TableCell>{politician.sentenceDuration} mois</TableCell>
                <TableCell>{politician.fine.toLocaleString()} €</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
