import React from 'react';
import { Box, Typography } from '@mui/material';
import BalanceIcon from '@mui/icons-material/Balance';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 24px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    borderRadius: '8px',
    marginBottom: '24px',
  },
  logoSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    color: '#1976d2',
    fontSize: '28px',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: '1.25rem',
  },
  search: {
    position: 'relative',
    borderRadius: '50px',
    backgroundColor: '#f5f6fa',
    marginLeft: 'auto',
    marginRight: '24px',
    width: '300px',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    padding: '0 16px',
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9e9e9e',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: '10px 10px 10px 48px',
    width: '100%',
    fontSize: '0.875rem',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  iconButton: {
    color: '#757575',
  },
  avatar: {
    width: 36,
    height: 36,
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    color: '#333',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  userName: {
    fontWeight: 500,
    color: '#333',
  },
};

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ 
}) => {
  return (
    <Box sx={styles.header}>
      <Box sx={styles.logoSection}>
        <BalanceIcon sx={styles.logoIcon} />
        <Typography variant="h6" sx={styles.logo}>
        Nos Politiques Ont Du Talent
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
