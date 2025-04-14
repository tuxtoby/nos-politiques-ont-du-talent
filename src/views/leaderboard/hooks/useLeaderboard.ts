import { useState, useMemo } from 'react';
import { Politician } from '../../../entities/Politician';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { Party } from '../../../entities/Party';
import { PoliticalSide } from '../../../entities/PoliticalSide';

type DisplayMode = 'general' | 'parti' | 'couleur';

export function useLeaderboard(data: Politician[]) {
  const [displayMode, setDisplayMode] = useState<DisplayMode>('general');
  const [searchQuery, setSearchQuery] = useState('');

  const handleDisplayModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: DisplayMode | null,
  ) => {
    if (newMode !== null) {
      setDisplayMode(newMode);
    }
  };

  const processedData = useMemo(() => processData(data, displayMode), [data, displayMode]);
  
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return processedData;
    }
    
    const normalizedQuery = searchQuery.toLowerCase().trim();
    
    return processedData.filter(item => 
      item.name.toLowerCase().includes(normalizedQuery) || 
      item.caption.toLowerCase().includes(normalizedQuery)
    );
  }, [processedData, searchQuery]);

  const topThree = useMemo(() => 
    filteredData.slice(0, 3), 
    [filteredData]
  );

  return {
    displayMode,
    handleDisplayModeChange,
    searchQuery,
    setSearchQuery,
    leaderboardData: filteredData,
    topThree
  };
}

function processData(data: Politician[], displayMode: DisplayMode): LeaderboardData[] {
  if (displayMode === 'general') {
    return processGeneralData(data);
  } else if (displayMode === 'parti') {
    return processPartyData(data);
  } else {
    return processPoliticalSideData(data);
  }
}

function processGeneralData(data: Politician[]): LeaderboardData[] {
  return data.map(politician => createLeaderboardDataFromPolitician(politician))
    .sort(sortLeaderboardData);
}

function processPartyData(data: Politician[]): LeaderboardData[] {
  const groupedData = groupDataByParty(data);
  return Object.values(groupedData).sort(sortLeaderboardData);
}

function processPoliticalSideData(data: Politician[]): LeaderboardData[] {
  const groupedData = groupDataByPoliticalSide(data);
  return Object.values(groupedData).sort(sortLeaderboardData);
}

function groupDataByParty(data: Politician[]): Record<string, LeaderboardData> {
  return data.reduce((acc, politician) => {
    const partyId = politician.party?.id;
    if (!partyId) return acc;
    
    if (!acc[partyId]) {
      acc[partyId] = createLeaderboardDataFromParty(politician.party);
    }
    
    updatePartyLeaderboardData(acc[partyId], politician);
    return acc;
  }, {} as Record<string, LeaderboardData>);
}

function groupDataByPoliticalSide(data: Politician[]): Record<string, LeaderboardData> {
  return data.reduce((acc, politician) => {
    const politicalSide = politician.party?.politicalSide;
    if (!politicalSide) return acc;
    
    const sideId = String(politicalSide.id);
    
    if (!acc[sideId]) {
      acc[sideId] = createLeaderboardDataFromPoliticalSide(politicalSide);
    }
    
    updatePoliticalSideLeaderboardData(acc[sideId], politician);
    return acc;
  }, {} as Record<string, LeaderboardData>);
}

function sortLeaderboardData(a: LeaderboardData, b: LeaderboardData): number {
  const scoreA = a.numberOfSentences || 0;
  const scoreB = b.numberOfSentences || 0;
  return scoreB - scoreA;
}

function createLeaderboardDataFromPolitician(politician: Politician): LeaderboardData {
  const totalPrisonTime = calculateTotalPrisonTime(politician.sentences);
  const totalFine = calculateTotalFine(politician.sentences);
  
  return {
    id: politician.id,
    name: politician.name,
    caption: politician.party?.name + ' (' + politician.party?.abbreviation + ')' || '',
    politicalEntity: politician,
    logo_url: politician.photo || '',
    numberOfSentences: politician.sentences.length,
    totalPrisonTime,
    totalFine
  };
}

function createLeaderboardDataFromParty(party: Party): LeaderboardData {
  return {
    id: party.id,
    name: party.name,
    caption: party.abbreviation || '',
    politicalEntity: party,
    logo_url: party.logo_url || '',
    numberOfSentences: 0,
    totalPrisonTime: 0,
    totalFine: 0
  };
}

function createLeaderboardDataFromPoliticalSide(politicalSide: PoliticalSide): LeaderboardData {
  return {
    id: String(politicalSide.id),
    name: politicalSide.name,
    caption: '',
    politicalEntity: politicalSide,
    logo_url: '',
    numberOfSentences: 0,
    totalPrisonTime: 0,
    totalFine: 0
  };
}

function updatePartyLeaderboardData(leaderboardData: LeaderboardData, politician: Politician): void {
  leaderboardData.numberOfSentences += politician.sentences.length;
  leaderboardData.totalPrisonTime += calculateTotalPrisonTime(politician.sentences);
  leaderboardData.totalFine += calculateTotalFine(politician.sentences);
}

function updatePoliticalSideLeaderboardData(leaderboardData: LeaderboardData, politician: Politician): void {
  leaderboardData.numberOfSentences += politician.sentences.length;
  leaderboardData.totalPrisonTime += calculateTotalPrisonTime(politician.sentences);
  leaderboardData.totalFine += calculateTotalFine(politician.sentences);
}

function calculateTotalPrisonTime(sentences: Politician['sentences']): number {
  return sentences.reduce((total, sentence) => total + (sentence.prisonTime || 0), 0);
}

function calculateTotalFine(sentences: Politician['sentences']): number {
  return sentences.reduce((total, sentence) => total + (sentence.fine || 0), 0);
}
