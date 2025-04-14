import React from 'react';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { SentencesChip, PrisonTimeChip, FineChip } from '../../../../components';
import { Sentence } from '../../../../entities/Sentence';
import { styles } from './styles';

interface SentenceSummaryProps {
  sentences: Sentence[];
}

export function SentenceSummary({ sentences }: SentenceSummaryProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const totalFine = calculateTotalFine(sentences);
  const totalPrisonTime = calculateTotalPrisonTime(sentences);

  return (
    <Box sx={styles.sentenceCount}>
      <Stack direction={isMobile ? "column" : "row"} spacing={1} sx={styles.totalChips}>
        <SentencesChip count={sentences.length} size="small"/>
        <PrisonTimeChip months={totalPrisonTime} size="small"/>
        <FineChip amount={totalFine} size="small"/>
      </Stack>
    </Box>
  );
}

function calculateTotalFine(sentences: Sentence[]): number {
  return sentences.reduce((sum, sentence) => sum + sentence.fine, 0);
}

function calculateTotalPrisonTime(sentences: Sentence[]): number {
  return sentences.reduce((sum, sentence) => sum + sentence.prisonTime, 0);
}
