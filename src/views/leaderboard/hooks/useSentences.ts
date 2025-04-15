import { useMemo } from 'react';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { Sentence } from '../../../entities/Sentence';
import { Politician } from '../../../entities/Politician';
import { Party } from '../../../entities/Party';
import { PoliticalSide } from '../../../entities/PoliticalSide';

export function useSentences(selectedData: LeaderboardData | null, allPoliticians: Politician[]) {
  const sentences = useMemo(() => {
    if (!selectedData) return [];
    return getSentencesForEntity(selectedData, allPoliticians);
  }, [selectedData, allPoliticians]);

  return { sentences };
}

function getSentencesForEntity(data: LeaderboardData, allPoliticians: Politician[]): Sentence[] {
  const entity = data.politicalEntity;

  if ('sentences' in entity) {
    return getPoliticianSentences(entity as Politician);
  } else if ('abbreviation' in entity) {
    return getPartySentences(entity as Party, allPoliticians);
  } else {
    return getPoliticalSideSentences(entity as PoliticalSide, allPoliticians);
  }
}

function getPoliticianSentences(politician: Politician): Sentence[] {
  return politician.sentences;
}

function getPartySentences(party: Party, allPoliticians: Politician[]): Sentence[] {
  const politiciansInParty = allPoliticians.filter(politician => politician.party?.id === party.id);

  return politiciansInParty.flatMap(politician => politician.sentences);
}

function getPoliticalSideSentences(
  politicalSide: PoliticalSide,
  allPoliticians: Politician[]
): Sentence[] {
  const politiciansWithSide = allPoliticians.filter(
    politician => politician.party?.politicalSide?.id === politicalSide.id
  );

  return politiciansWithSide.flatMap(politician => politician.sentences);
}
