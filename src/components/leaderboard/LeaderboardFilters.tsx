import React from 'react';
import { ButtonGroup, Button } from '@mui/material';

interface LeaderboardFiltersProps {
  timeFilter: 'Today' | 'Week' | 'Month';
  setTimeFilter: (filter: 'Today' | 'Week' | 'Month') => void;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({ 
  timeFilter, 
  setTimeFilter 
}) => {
  return (
    <ButtonGroup variant="outlined" size="small">
      <Button 
        variant={timeFilter === 'Week' ? 'contained' : 'outlined'}
        onClick={() => setTimeFilter('Week')}
      >
        Week
      </Button>
      <Button 
        variant={timeFilter === 'Month' ? 'contained' : 'outlined'}
        onClick={() => setTimeFilter('Month')}
      >
        Month
      </Button>
      <Button 
        variant={timeFilter === 'Today' ? 'contained' : 'outlined'}
        onClick={() => setTimeFilter('Today')}
      >
        Today
      </Button>
    </ButtonGroup>
  );
};
