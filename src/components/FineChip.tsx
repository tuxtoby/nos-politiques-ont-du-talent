import React from 'react';
import { Chip, ChipProps, Typography, Box } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const styles = {
  fineChip: {
    backgroundColor: '#e3f2fd',
    color: '#0277bd',
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: '#0277bd',
    },
  },
  empty: {
    textAlign: 'center',
    color: '#9e9e9e',
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'italic',
    gap: 1,
  },
  emptyIcon: {
    fontSize: '1rem',
    color: '#9e9e9e',
  },
};

interface FineChipProps extends Omit<ChipProps, 'icon' | 'label'> {
  amount: number;
}

export const FineChip: React.FC<FineChipProps> = ({ amount, ...chipProps }) => {
  if (amount <= 0) {
    return (
      <Box sx={styles.empty}>
        <MoneyOffIcon sx={styles.emptyIcon} />
        <Typography variant="body2">Aucune amende</Typography>
      </Box>
    );
  }

  return (
    <Chip
      icon={<PaymentIcon />}
      label={`${amount.toLocaleString()} €`}
      sx={{ ...styles.fineChip, ...chipProps.sx }}
      {...chipProps}
    />
  );
};
