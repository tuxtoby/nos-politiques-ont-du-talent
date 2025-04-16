import { useMemo } from 'react';
import { LeaderboardData } from '../adapters/LeaderboardData';
import { Sentence } from '../../../entities/Sentence';
import { Politician } from '../../../entities/Politician';
import { Party } from '../../../entities/Party';
import { PoliticalSide } from '../../../entities/PoliticalSide';

export interface SentenceWithPolitician {
  sentence: Sentence;
  politicianName?: string;
}

export function useSentences(selectedData: LeaderboardData | null, allPoliticians: Politician[]) {
  const sentencesWithPoliticians = useMemo(() => {
    if (!selectedData) return [];
    return getSentencesForEntity(selectedData, allPoliticians);
  }, [selectedData, allPoliticians]);

  return { sentences: sentencesWithPoliticians };
}

function getSentencesForEntity(data: LeaderboardData, allPoliticians: Politician[]): SentenceWithPolitician[] {
  const entity = data.politicalEntity;

  if ('sentences' in entity) {
    return getPoliticianSentences(entity as Politician);
  } else if ('abbreviation' in entity) {
    return getPartySentences(entity as Party, allPoliticians);
  } else {
    return getPoliticalSideSentences(entity as PoliticalSide, allPoliticians);
  }
}

function getPoliticianSentences(politician: Politician): SentenceWithPolitician[] {
  return politician.sentences.map(sentence => ({
    sentence,
    politicianName: undefined // No need to show politician name when viewing the politician's own sentences
  }));
}

function getPartySentences(party: Party, allPoliticians: Politician[]): SentenceWithPolitician[] {
  const politiciansInParty = allPoliticians.filter(politician => politician.party?.id === party.id);

  return politiciansInParty.flatMap(politician => 
    politician.sentences.map(sentence => ({
      sentence,
      politicianName: politician.name
    }))
  );
}

function getPoliticalSideSentences(
  politicalSide: PoliticalSide,
  allPoliticians: Politician[]
): SentenceWithPolitician[] {
  const politiciansWithSide = allPoliticians.filter(
    politician => politician.party?.politicalSide?.id === politicalSide.id
  );

  return politiciansWithSide.flatMap(politician => 
    politician.sentences.map(sentence => ({
      sentence,
      politicianName: politician.name
    }))
  );
}
