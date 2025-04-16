import { Politician } from '../entities/Politician';
import { Party } from '../entities/Party';
import { PoliticalSide } from '../entities/PoliticalSide';

export function findPoliticianBySimplifiedName(
  politicians: Politician[],
  simplifiedName: string
): Politician | undefined {
  return politicians.find(
    (politician) => politician.simplified_name === simplifiedName
  );
}

export function findPartyByAbbreviation(
  politicians: Politician[],
  abbreviation: string
): Party | undefined {
  // Create a set of unique parties from all politicians
  const uniqueParties = new Map<string, Party>();
  
  politicians.forEach(politician => {
    if (politician.party && politician.party.id) {
      uniqueParties.set(politician.party.id, politician.party);
    }
  });
  
  // Convert to array and find the party with matching abbreviation (case insensitive)
  return Array.from(uniqueParties.values()).find(
    party => party.abbreviation && party.abbreviation.toLowerCase() === abbreviation.toLowerCase()
  );
}

export function findPoliticalSideBySimplifiedName(
  politicians: Politician[],
  simplifiedName: string
): PoliticalSide | undefined {
  // Create a set of unique political sides from all politicians
  const uniqueSides = new Map<string, PoliticalSide>();
  
  politicians.forEach(politician => {
    if (politician.party && politician.party.politicalSide) {
      const side = politician.party.politicalSide;
      uniqueSides.set(side.id.toString(), side);
    }
  });
  
  // Convert to array and find the political side with matching simplified_name (exact match)
  return Array.from(uniqueSides.values()).find(
    side => side.simplified_name === simplifiedName
  );
}
