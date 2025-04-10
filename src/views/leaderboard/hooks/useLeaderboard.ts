import { useState } from 'react';
import { PoliticalFigure } from '../../../types/PoliticalFigure';

type DisplayMode = 'general' | 'parti' | 'couleur';

export function useLeaderboard(data: PoliticalFigure[]) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('general');

  const handleDisplayModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: DisplayMode | null,
  ) => {
    if (newMode !== null) {
      setDisplayMode(newMode);
    }
  };

  const sortedPoliticians = processData(data, displayMode);
  const topThree = sortedPoliticians.slice(0, 3);

  return {
    displayMode,
    handleDisplayModeChange,
    sortedPoliticians,
    topThree
  };
}

function processData(data: PoliticalFigure[], displayMode: DisplayMode): PoliticalFigure[] {
  if (displayMode === 'general') {
    return processGeneralData(data);
  } else if (displayMode === 'parti') {
    return processPartyData(data);
  } else {
    return processPoliticalSideData(data);
  }
}

function processGeneralData(data: PoliticalFigure[]): PoliticalFigure[] {
  return [...data].sort(sortPoliticians);
}

function processPartyData(data: PoliticalFigure[]): PoliticalFigure[] {
  const groupedData = groupDataByProperty(data, 'party');
  return Object.values(groupedData).sort(sortPoliticians);
}

function processPoliticalSideData(data: PoliticalFigure[]): PoliticalFigure[] {
  const groupedData = groupDataByProperty(data, 'politicalSideName');
  return Object.values(groupedData).sort(sortPoliticians);
}

function groupDataByProperty(data: PoliticalFigure[], property: 'party' | 'politicalSideName'): Record<string, PoliticalFigure> {
  return data.reduce((acc, politician) => {
    const key = politician[property];
    if (!acc[key]) {
      acc[key] = createGroupEntity(politician, key);
    }
    updateGroupEntity(acc[key], politician);
    return acc;
  }, {} as Record<string, PoliticalFigure>);
}

function sortPoliticians(a: PoliticalFigure, b: PoliticalFigure): number {
  const scoreA = a.charges.length;
  const scoreB = b.charges.length;
  return scoreB - scoreA;
}

function createGroupEntity(politician: PoliticalFigure, key: string): PoliticalFigure {
  return {
    id: key,
    name: key,
    party: key,
    politicalSideName: politician.politicalSideName,
    politicalColor: politician.politicalColor,
    photo: '',
    charges: [],
    sentenceDuration: 0,
    fine: 0
  };
}

function updateGroupEntity(groupEntity: PoliticalFigure, politician: PoliticalFigure): void {
  groupEntity.sentenceDuration += politician.sentenceDuration;
  groupEntity.fine += politician.fine;
  groupEntity.charges = Array.from(new Set([...groupEntity.charges, ...politician.charges]));
}

function calculateScore(politician: PoliticalFigure): number {
  return politician.fine + (politician.sentenceDuration * 10000);
}
