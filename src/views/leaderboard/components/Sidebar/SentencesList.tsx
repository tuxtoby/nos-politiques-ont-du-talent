import React from 'react';
import { List, Typography } from '@mui/material';
import { SentenceWithPolitician } from '../../hooks/useSentences';
import { SentenceCard } from './SentenceCard';
import { styles } from './styles';

interface SentencesListProps {
  sentences: SentenceWithPolitician[];
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
      {sentences.map((sentenceWithPolitician, index) => (
        <SentenceCard 
          key={index} 
          sentence={sentenceWithPolitician.sentence} 
          politicianName={sentenceWithPolitician.politicianName}
        />
      ))}
    </List>
  );
}
