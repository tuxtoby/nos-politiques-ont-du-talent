export const styles = {
    drawer: {
    width: { xs: '100%', sm: 380 },
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: { xs: '100%', sm: 380 },
      boxSizing: 'border-box',
      padding: { xs: 1, sm: 2 }
    }
  },
  closeHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    mb: { xs: 1, sm: 1 }
  },
  closeButton: {
    color: 'text.secondary',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      color: 'text.primary'
    }
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
  },
  condemnationsSection: {
    mt: { xs: 2, sm: 3 }
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: { xs: '1.1rem', sm: '1.25rem' },
    mb: { xs: 2, sm: 2 }
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: { xs: 2, sm: 3 }
  },
  title: {
    fontWeight: 'bold',
    fontSize: { xs: '1.1rem', sm: '1.25rem' }
  },
  entityInfo: {
    display: 'flex',
    alignItems: 'center',
    mb: { xs: 3, sm: 2 },
    mt: { xs: 1, sm: 0 },
    pb: { xs: 2, sm: 3 },
  },
  avatar: {
    width: { xs: 50, sm: 70 },
    height: { xs: 50, sm: 70 },
    mr: 2,
    boxShadow: '0 3px 5px rgba(0,0,0,0.1)'
  },
  entityName: {
    fontSize: { xs: '1.1rem', sm: '1.25rem' },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  entityType: {
    fontSize: { xs: '0.75rem', sm: '0.875rem' }
  },
  entityCaption: {
    fontSize: { xs: '0.7rem', sm: '0.75rem' }
  },
  voteButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    mt: 1,
    mb: 2,
    textDecoration: 'none',
    color: 'primary.main',
    borderRadius: 2,
    padding: '8px 16px',
    fontSize: { xs: '0.85rem', sm: '0.95rem' },
    fontWeight: 'medium',
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.15)',
      textDecoration: 'none',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transform: 'translateY(-1px)'
    }
  },
  voteButtonIcon: {
    fontSize: { xs: '1rem', sm: '1.1rem' },
    marginRight: 1
  },
  sentenceItem: {
    display: 'flex',
    flexDirection: 'column',
    py: 2,
    px: 0
  },
  sentenceCard: {
    p: { xs: 1.5, sm: 2 },
    mb: 2,
    borderRadius: 2,
    boxShadow: '0 3px 4px rgba(0,0,0,0.15)',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
    }
  },
  sentenceType: {
    fontWeight: 'bold',
    mb: 2,
    fontSize: { xs: '1rem', sm: '1.1rem' }
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
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    mt: 1
  },
  sentenceSource: {
    display: 'flex',
    alignItems: 'center',
    color: 'text.secondary',
    fontSize: { xs: '0.7rem', sm: '0.75rem' },
    mt: 1,
    wordBreak: 'break-word'
  },
  sourceLink: {
    display: 'flex',
    alignItems: 'center',
    color: 'primary.main',
    fontSize: { xs: '0.7rem', sm: '0.75rem' },
    fontStyle: 'italic',
    mt: 1,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  externalLinkIcon: {
    fontSize: { xs: '0.7rem', sm: '0.75rem' },
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
  totalChips: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 1
  },
  dateIcon: {
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    marginRight: 0.5,
    color: 'text.secondary'
  },
  linkIcon: {
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    marginRight: 0.5,
    color: 'text.secondary'
  }
};
