import React from 'react';
import { Box, Typography, Drawer, IconButton, useMediaQuery, useTheme, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
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
  allPoliticians,
}: SentencesSidebarProps) {
  const { sentences } = useSentences(selectedData, allPoliticians);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!selectedData) {
    return null;
  }

  return (
    <Drawer anchor={isMobile ? 'bottom' : 'right'} open={open} onClose={onClose} sx={styles.drawer}>
      <CloseButtonHeader onClose={onClose} />
      <Box sx={styles.contentContainer}>
        <EntityHeader selectedData={selectedData} />
        {sentences.length > 0 && <SentenceSummary sentences={sentences} />}

        {selectedData.vote_url && (
          <Link
            href={selectedData.vote_url}
            target="_blank"
            rel="noopener noreferrer"
            sx={styles.voteButton}
            underline="none"
          >
            <HowToVoteIcon sx={styles.voteButtonIcon} />
            Voir son activité parlementaire
          </Link>
        )}

        <Box sx={styles.condemnationsSection}>
          <Typography variant="h6" sx={styles.sectionTitle}>
            Condamnations
          </Typography>
          <SentencesList sentences={sentences} />
        </Box>
      </Box>
    </Drawer>
  );
}

function CloseButtonHeader({ onClose }: { onClose: () => void }) {
  return (
    <Box sx={styles.closeHeader}>
      <IconButton onClick={onClose} size="small" sx={styles.closeButton}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
