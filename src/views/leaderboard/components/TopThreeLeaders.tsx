import React from 'react';
import { Grid, Card, CardContent, Box, Avatar, Typography } from '@mui/material';
import { EmojiEvents as TrophyIcon } from '@mui/icons-material';
import { PoliticalFigure } from '../../../entities/PoliticalFigure';

const styles = {
  card: {
    borderRadius: 5, 
    boxShadow: 2
  },
  profileBox: {
    display: 'flex', 
    alignItems: 'center', 
    mb: 2
  },
  avatar: {
    width: 90, 
    height: 90
  },
  infoBox: {
    ml: 2
  },
  trophyIcon: {
    ml: 'auto',
    width: 50,
    height: 50
  },
  statsContainer: {
    textAlign: 'center'
  }
};

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
    <Grid container spacing={5}>
      {leaders.map((politician, index) => (
        <Grid size={{ xs: 12, md: 4 }} key={politician.id}>
          <Card sx={styles.card}>
            <CardContent>
              <Box sx={styles.profileBox}>
                <Avatar
                  sx={{
                    ...styles.avatar,
                    bgcolor: politician.photo ? 'transparent' : politician.politicalSideName
                  }}
                  src={politician.photo}
                >
                  {!politician.photo}
                </Avatar>
                <Box sx={styles.infoBox}>
                  <Typography variant="h6">{politician.name}</Typography>
                  <Typography color="textSecondary">{politician.party}</Typography>
                </Box>
                <TrophyIcon sx={{
                  ...styles.trophyIcon,
                  color: getTrophyColor(index)
                }} />
              </Box>
              <Grid container spacing={2} sx={styles.statsContainer}>
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
