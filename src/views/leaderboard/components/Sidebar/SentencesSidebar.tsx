import React from 'react';
import { Box, Typography, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LeaderboardData } from '../../adapters/LeaderboardData';
import { Politician } from '../../../../entities/Politician';
import { useSentences } from '../../hooks/useSentences';
import { EntityHeader } from './EntityHeader';
import { SentenceSummary } from './SentenceSummary';
import { SentencesList } from './SentencesList';
import { styles } from './styles';

interface SentencesSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedData: LeaderboardData | null;
  allPoliticians: Politician[];
}

export function SentencesSidebar({ 
  open, 
  onClose, 
  selectedData,
  allPoliticians
}: SentencesSidebarProps) {
  const { sentences } = useSentences(selectedData, allPoliticians);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  if (!selectedData) {
    return null;
  }

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      sx={styles.drawer}
    >
      <SidebarHeader onClose={onClose} />
      <EntityHeader selectedData={selectedData} />
      
      {sentences.length > 0 && <SentenceSummary sentences={sentences} />}
      <SentencesList sentences={sentences} />
    </Drawer>
  );
}

function SidebarHeader({ onClose }: { onClose: () => void }) {
  return (
    <Box sx={styles.header}>
      <Typography variant="h6" sx={styles.title}>
        Condamnations
      </Typography>
      <IconButton onClick={onClose} size="small">
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
