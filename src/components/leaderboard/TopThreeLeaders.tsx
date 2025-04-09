import React from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { PoliticalFigure } from '../../types';

interface TopThreeLeadersProps {
  leaders: PoliticalFigure[];
}

export const TopThreeLeaders: React.FC<TopThreeLeadersProps> = ({ leaders }) => {
  const getTrophyColor = (index: number) => {
    switch(index) {
      case 0: return '#FFD700';
      case 1: return '#C0C0C0';
      case 2: return '#CD7F32';
      default: return 'inherit';
    }
  };

  return (
    <Grid container spacing={3}>
      {leaders.map((politician, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={politician.id}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ 
                    width: 60, 
                    height: 60,
                    bgcolor: politician.politicalColor
                  }}
                >
                  {politician.name.charAt(0)}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">{politician.name}</Typography>
                  <Typography color="textSecondary">{politician.party}</Typography>
                </Box>
                <TrophyIcon sx={{ ml: 'auto', color: getTrophyColor(index) }} />
              </Box>
              <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                <Grid size={{ xs: 4}}>
                  <Typography variant="h6">{politician.charges.length}</Typography>
                  <Typography variant="caption">CHARGES</Typography>
                </Grid>
                <Grid size={{ xs: 4}}>
                  <Typography variant="h6">{politician.sentenceDuration}</Typography>
                  <Typography variant="caption">MONTHS</Typography>
                </Grid>
                <Grid size={{ xs: 4}}>
                  <Typography variant="h6">{(politician.fine / 1000).toFixed(0)}K</Typography>
                  <Typography variant="caption">FINE (€)</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
