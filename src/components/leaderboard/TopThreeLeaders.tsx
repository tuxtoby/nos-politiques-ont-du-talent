import React from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { PoliticalFigure } from '../../types/PoliticalFigure';

interface TopThreeLeadersProps {
  leaders: PoliticalFigure[];
}

const trophyStyles = {
  largeIcon: {
    width: 50,
    height: 50,
  },

};

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
    <Grid container spacing={5}>
      {leaders.map((politician, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={politician.id}>
          <Card sx={{ borderRadius: 5, boxShadow: 2}}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{ 
                    width: 90, 
                    height: 90,
                    bgcolor: politician.photo ? 'transparent' : politician.politicalSideName
                  }}
                  src={politician.photo}
                >
                  {!politician.photo}
                </Avatar>
                <Box sx={{ ml: 2 }}>
                  <Typography variant="h6">{politician.name}</Typography>
                  <Typography color="textSecondary">{politician.party}</Typography>
                </Box>
                <TrophyIcon sx={{ ml: 'auto', color: getTrophyColor(index), ...trophyStyles.largeIcon }} />
              </Box>
              <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                <Grid size={{ xs: 4}}>
                  <Typography variant="h5">{politician.charges.length}</Typography>
                  <Typography variant="caption">CONDAMNATIONS</Typography>
                </Grid>
                <Grid size={{ xs: 4}}>
                  <Typography variant="h5">{politician.sentenceDuration}</Typography>
                  <Typography variant="caption">MOIS DE PRISON</Typography>
                </Grid>
                <Grid size={{ xs: 4}}>
                  <Typography variant="h5">{politician.fine.toLocaleString()} €</Typography>
                  <Typography variant="caption">D'AMENDE</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
