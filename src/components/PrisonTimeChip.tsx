import React from 'react';
import { Chip, ChipProps, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

const styles = {
  prisonChip: {
    backgroundColor: '#fce4ec',
    color: '#c2185b',
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: '#c2185b'
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

interface PrisonTimeChipProps extends Omit<ChipProps, 'icon' | 'label'> {
  months: number;
}

export const PrisonTimeChip: React.FC<PrisonTimeChipProps> = ({ 
  months, 
  ...chipProps 
}) => {
  if (months <= 0) {
    return (
      <Box sx={styles.empty}>
        <DoNotDisturbIcon sx={styles.emptyIcon} />
        <Typography variant="body2">Pas de prison</Typography>
      </Box>
    );
  }
  
  return (
    <Chip 
      icon={<AccessTimeIcon />}
      label={`${months} mois`}
      sx={{ ...styles.prisonChip, ...chipProps.sx }}
      {...chipProps}
    />
  );
};
