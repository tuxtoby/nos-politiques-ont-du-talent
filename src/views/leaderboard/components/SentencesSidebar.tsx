import React from 'react';
import { 
  Box, 
  Typography, 
  Drawer, 
  List, 
  IconButton,
  Avatar,
  Chip,
  Paper,
  Stack,
  Link
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { Politician } from '../../../entities/Politician';
import { Party } from '../../../entities/Party';
import { PoliticalSide } from '../../../entities/PoliticalSide';
import { politicalColors } from '../../../constants/colors';
import { useSentences } from '../hooks/useSentences';

const styles = {
  drawer: {
    width: 380,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 380,
      boxSizing: 'border-box',
      padding: 2
    }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: 3
  },
  title: {
    fontWeight: 'bold'
  },
  entityInfo: {
    display: 'flex',
    alignItems: 'center',
    mb: 4,
    mt: 2,
    pb: 3,
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
  },
  avatar: {
    width: 70,
    height: 70,
    mr: 2,
    boxShadow: '0 3px 5px rgba(0,0,0,0.1)'
  },
  sentenceItem: {
    display: 'flex',
    flexDirection: 'column',
    py: 2,
    px: 0
  },
  sentenceCard: {
    p: 2,
    mb: 2,
    borderRadius: 2,
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    }
  },
  sentenceType: {
    fontWeight: 'bold',
    mb: 2,
    fontSize: '1.1rem'
  },
  sentenceDetails: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mb: 2
  },
  sentenceDate: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.secondary',
    fontSize: '0.875rem',
    mt: 1
  },
  sentenceSource: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.secondary',
    fontSize: '0.75rem',
    mt: 1,
    wordBreak: 'break-word'
  },
  sourceLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'primary.main',
    fontSize: '0.75rem',
    fontStyle: 'italic',
    mt: 1,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  externalLinkIcon: {
    fontSize: '0.75rem',
    ml: 0.5
  },
  noSentences: {
    textAlign: 'center',
    color: 'text.secondary',
    mt: 6,
    p: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.02)'
  },
  sentenceCount: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3
  },
  sentenceCountChip: {
    fontWeight: 'bold'
  },
  fineChip: {
    backgroundColor: '#e3f2fd',
    color: '#0277bd',
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: '#0277bd'
    }
  },
  prisonChip: {
    backgroundColor: '#fce4ec',
    color: '#c2185b',
    fontWeight: 'bold',
    '& .MuiChip-icon': {
      color: '#c2185b'
    }
  },
  totalChips: {
    display: 'flex',
    gap: 1
  },
  dateIcon: {
    fontSize: '0.875rem',
    marginRight: 0.5,
    color: 'text.secondary'
  },
  linkIcon: {
    fontSize: '0.875rem',
    marginRight: 0.5,
    color: 'text.secondary'
  }
};

interface SentencesSidebarProps {
  open: boolean;
  onClose: () => void;
  selectedData: LeaderboardData | null;
  allPoliticians: Politician[];
}

export const SentencesSidebar: React.FC<SentencesSidebarProps> = ({ 
  open, 
  onClose, 
  selectedData,
  allPoliticians
}) => {
  // Always call hooks at the top level, regardless of conditions
  const { sentences } = useSentences(selectedData, allPoliticians);
  
  // If no selected data, don't render the drawer
  if (!selectedData) {
    return null;
  }

  const entityType = getEntityType(selectedData.politicalEntity);
  
  const getAvatarBackgroundColor = () => {
    if (selectedData.logo_url) return undefined;
    
    if ('id' in selectedData.politicalEntity && typeof selectedData.politicalEntity.id === 'number') {
      const politicalSide = selectedData.politicalEntity as PoliticalSide;
      return politicalColors[politicalSide.id];
    }
    
    return '#808080'; // Default gray color for non-political side entities
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const formatSourceUrl = (source: string) => {
    if (isValidUrl(source)) {
      return source;
    }
    
    // Try to extract a URL from the source text
    const urlMatch = source.match(/https?:\/\/[^\s]+/);
    if (urlMatch) {
      return urlMatch[0];
    }
    
    return '';
  };

  const totalFine = sentences.reduce((sum, s) => sum + s.fine, 0);
  const totalPrisonTime = sentences.reduce((sum, s) => sum + s.prisonTime, 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={styles.drawer}
    >
      <Box sx={styles.header}>
        <Typography variant="h6" sx={styles.title}>
          Condamnations
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={styles.entityInfo}>
        <Avatar 
          sx={{
            ...styles.avatar,
            bgcolor: getAvatarBackgroundColor()
          }}
          src={selectedData.logo_url}
        >
          {!selectedData.logo_url && selectedData.name.charAt(0)}
        </Avatar>
        <Box>
          <Typography variant="h6">{selectedData.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {entityType === 'politician' ? 'Politique' : 
             entityType === 'party' ? 'Parti politique' : 
             'Tendance politique'}
          </Typography>
          {selectedData.caption && (
            <Typography variant="caption" display="block">
              {selectedData.caption}
            </Typography>
          )}
        </Box>
      </Box>
      
      {sentences.length > 0 ? (
        <>
          <Box sx={styles.sentenceCount}>
            <Typography variant="body1">
              {sentences.length} condamnation{sentences.length > 1 ? 's' : ''}
            </Typography>
            <Stack direction="row" spacing={1}>
              {totalPrisonTime > 0 && (
                <Chip 
                  icon={<AccessTimeIcon />}
                  label={`${totalPrisonTime} mois`}
                  size="small"
                  sx={styles.prisonChip}
                />
              )}
              {totalFine > 0 && (
                <Chip 
                  icon={<AttachMoneyIcon />}
                  label={`${totalFine.toLocaleString()} €`}
                  size="small"
                  sx={styles.fineChip}
                />
              )}
            </Stack>
          </Box>
          <List disablePadding>
            {sentences.map((sentence, index) => (
              <Paper key={index} sx={styles.sentenceCard} elevation={0}>
                <Typography variant="subtitle1" sx={styles.sentenceType}>
                  {sentence.type}
                </Typography>
                
                <Box sx={styles.sentenceDetails}>
                  {sentence.fine > 0 && (
                    <Chip
                      icon={<AttachMoneyIcon />}
                      label={`${sentence.fine.toLocaleString()} €`}
                      size="small"
                      sx={styles.fineChip}
                    />
                  )}
                  
                  {sentence.prisonTime > 0 && (
                    <Chip
                      icon={<AccessTimeIcon />}
                      label={`${sentence.prisonTime} mois de prison`}
                      size="small"
                      sx={styles.prisonChip}
                    />
                  )}
                </Box>
                
                <Typography variant="body2" sx={styles.sentenceDate}>
                  <EventIcon sx={styles.dateIcon} />
                  {formatDate(sentence.date)}
                </Typography>
                
                {sentence.source && (
                  <>
                    {isValidUrl(sentence.source) || sentence.source.match(/https?:\/\/[^\s]+/) ? (
                      <Link 
                        href={formatSourceUrl(sentence.source)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={styles.sourceLink}
                        underline="hover"
                      >
                        <LinkIcon sx={styles.linkIcon} />
                        {sentence.source.length > 50 
                          ? `${sentence.source.substring(0, 50)}...` 
                          : sentence.source}
                        <OpenInNewIcon sx={styles.externalLinkIcon} />
                      </Link>
                    ) : (
                      <Typography variant="body2" sx={styles.sentenceSource}>
                        <LinkIcon sx={styles.linkIcon} />
                        {sentence.source}
                      </Typography>
                    )}
                  </>
                )}
              </Paper>
            ))}
          </List>
        </>
      ) : (
        <Typography variant="body1" sx={styles.noSentences}>
          Aucune condamnation trouvée
        </Typography>
      )}
    </Drawer>
  );
};

function getEntityType(entity: Politician | Party | PoliticalSide): 'politician' | 'party' | 'politicalSide' {
  if ('sentences' in entity) {
    return 'politician';
  } else if ('abbreviation' in entity) {
    return 'party';
  } else {
    return 'politicalSide';
  }
}
