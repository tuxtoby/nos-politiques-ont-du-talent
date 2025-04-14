import React from 'react';
import { Box, Typography, Avatar, Link } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import { LeaderboardData } from '../../adapters/LeaderboardData';
import { politicalColors } from '../../../../constants/colors';
import { PoliticalSide } from '../../../../entities/PoliticalSide';
import { getEntityType } from './utils';
import { styles } from './styles';

interface EntityHeaderProps {
  selectedData: LeaderboardData;
}

export function EntityHeader({ selectedData }: EntityHeaderProps) {
  const entityType = getEntityType(selectedData.politicalEntity);
  const avatarBackgroundColor = getAvatarBackgroundColor(selectedData);

  console.log(selectedData);
  
  return (
    <>
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
      <Box sx={styles.entityInfo}>
        <Avatar 
          sx={{
            ...styles.avatar,
            bgcolor: avatarBackgroundColor
          }}
          src={selectedData.logo_url}
        >
          {!selectedData.logo_url && selectedData.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6" sx={styles.entityName}>{selectedData.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={styles.entityType}>
            {getEntityTypeLabel(entityType)}
          </Typography>
          {selectedData.caption && (
            <Typography variant="caption" display="block" sx={styles.entityCaption}>
              {selectedData.caption}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

function getAvatarBackgroundColor(selectedData: LeaderboardData) {
  if (selectedData.logo_url) return undefined;
  
  if ('id' in selectedData.politicalEntity && typeof selectedData.politicalEntity.id === 'number') {
    const politicalSide = selectedData.politicalEntity as PoliticalSide;
    return politicalColors[politicalSide.id];
  }
  
  return '#808080';
}

function getEntityTypeLabel(entityType: 'politician' | 'party' | 'politicalSide'): string {
  if (entityType === 'politician') return 'Politique';
  if (entityType === 'party') return 'Parti politique';
  return 'Tendance politique';
}
