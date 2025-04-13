import React from 'react';
import { Chip, ChipProps, Typography, Box } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import NotInterestedIcon from '@mui/icons-material/NotInterested';

const styles = {
  sentencesChip: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: '#2e7d32'
    }
  },
  empty: {
    textAlign: 'center',
    color: '#9e9e9e',
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'italic',
    gap: 1
  },
  emptyIcon: {
    fontSize: '1rem',
    color: '#9e9e9e'
  }
};

interface SentencesChipProps extends Omit<ChipProps, 'icon' | 'label'> {
  count: number;
}

export const SentencesChip: React.FC<SentencesChipProps> = ({ 
  count,
  ...chipProps 
}) => {
  if (count <= 0) {
    return (
      <Box sx={styles.empty}>
        <NotInterestedIcon sx={styles.emptyIcon} />
        <Typography variant="body2">Aucune condamnation</Typography>
      </Box>
    );
  }
  
  return (
    <Chip 
      icon={<GavelIcon />}
      label={`${count} condamnation${count > 1 ? 's' : ''}`}
      size="medium"
      sx={{ ...styles.sentencesChip, ...chipProps.sx }}
      {...chipProps}
    />
  );
};
