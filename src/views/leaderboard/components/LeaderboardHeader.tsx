import React from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

interface LeaderboardHeaderProps {
  title: string;
  showSearch?: boolean;
}

export const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ 
  title,
  showSearch = false
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{title}</Typography>
      {showSearch && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search by user name"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </Box>
  );
};
