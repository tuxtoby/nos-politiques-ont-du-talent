import React from 'react';
import { Box, Typography, Paper, Link, useMediaQuery, useTheme } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { FineChip, PrisonTimeChip } from '../../../../components';
import { Sentence } from '../../../../entities/Sentence';
import { formatDate, isValidUrl, formatSourceUrl } from './utils';
import { styles } from './styles';

interface SentenceCardProps {
  sentence: Sentence;
}

export function SentenceCard({ sentence }: SentenceCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper sx={styles.sentenceCard} elevation={0}>
      <Typography variant="subtitle1" sx={styles.sentenceType}>
        {sentence.type}
      </Typography>
      
      <Box sx={styles.sentenceDetails}>
        <FineChip amount={sentence.fine} size="small" />
        <PrisonTimeChip months={sentence.prisonTime} size="small" />
      </Box>
      
      <Typography variant="body2" sx={styles.sentenceDate}>
        <EventIcon sx={styles.dateIcon} />
        {formatDate(sentence.date)}
      </Typography>
      
      {renderSource(isMobile, sentence.source)}
    </Paper>
  );
}

function renderSource(isMobile: boolean, source?: string) {
  if (!source) return null;

  const hasUrl = isValidUrl(source) || source.match(/https?:\/\/[^\s]+/);
  
  if (hasUrl) {
    return (
      <Link 
        href={formatSourceUrl(source)}
        target="_blank" 
        rel="noopener noreferrer"
        sx={styles.sourceLink}
        underline="hover"
      >
        <LinkIcon sx={styles.linkIcon} />
        {source.length > (isMobile ? 30 : 50) 
          ? `${source.substring(0, isMobile ? 30 : 50)}...` 
          : source}
        <OpenInNewIcon sx={styles.externalLinkIcon} />
      </Link>
    );
  }
  
  return (
    <Typography variant="body2" sx={styles.sentenceSource}>
      <LinkIcon sx={styles.linkIcon} />
      {source}
    </Typography>
  );
}
