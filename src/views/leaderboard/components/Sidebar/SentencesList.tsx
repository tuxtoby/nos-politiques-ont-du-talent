import React from 'react';
import { List, Typography } from '@mui/material';
import { Sentence } from '../../../../entities/Sentence';
import { SentenceCard } from './SentenceCard';
import { styles } from './styles';

interface SentencesListProps {
  sentences: Sentence[];
}

export function SentencesList({ sentences }: SentencesListProps) {
  if (sentences.length === 0) {
    return (
      <Typography variant="body1" sx={styles.noSentences}>
        Aucune condamnation trouvée
      </Typography>
    );
  }

  return (
    <List disablePadding>
      {sentences.map((sentence, index) => (
        <SentenceCard key={index} sentence={sentence} />
      ))}
    </List>
  );
}
