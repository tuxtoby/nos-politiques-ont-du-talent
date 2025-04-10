import React, { useState } from 'react';
import { 
  Fab, 
  Zoom, 
  Box,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import GavelIcon from '@mui/icons-material/Gavel';

const styles = {
  fabContainer: {
    position: 'fixed',
    bottom: 16,
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 2,
    zIndex: 1000
  },
  mainFab: {
    bgcolor: 'primary.main',
    '&:hover': {
      bgcolor: 'primary.dark',
    }
  },
  subFab: {
    bgcolor: 'secondary.main',
    '&:hover': {
      bgcolor: 'secondary.dark',
    }
  },
  fabLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1
  },
  labelText: {
    bgcolor: 'background.paper',
    px: 2,
    py: 1,
    borderRadius: 1,
    boxShadow: 1
  }
};

interface ActionButtonProps {
  onAddPolitician: () => void;
  onAddSentence: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  onAddPolitician,
  onAddSentence
}) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handlePoliticianClick = () => {
    onAddPolitician();
    setOpen(false);
  };

  const handleSentenceClick = () => {
    onAddSentence();
    setOpen(false);
  };

  return (
    <Box sx={styles.fabContainer}>
      <Zoom in={open} style={{ transitionDelay: open ? '100ms' : '0ms' }}>
        <Box sx={styles.fabLabel}>
          <Typography variant="body2" sx={styles.labelText}>
            Personnalité politique
          </Typography>
          <Fab
            size="medium"
            color="secondary"
            aria-label="add politician"
            sx={styles.subFab}
            onClick={handlePoliticianClick}
          >
            <PersonIcon />
          </Fab>
        </Box>
      </Zoom>
      
      <Zoom in={open} style={{ transitionDelay: open ? '0ms' : '0ms' }}>
        <Box sx={styles.fabLabel}>
          <Typography variant="body2" sx={styles.labelText}>
            Condamnation
          </Typography>
          <Fab
            size="medium"
            color="secondary"
            aria-label="add sentence"
            sx={styles.subFab}
            onClick={handleSentenceClick}
          >
            <GavelIcon />
          </Fab>
        </Box>
      </Zoom>
      
      <Fab
        color="primary"
        aria-label="add"
        sx={styles.mainFab}
        onClick={handleToggle}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};
