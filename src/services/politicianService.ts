import { Politician } from '../entities/Politician';
import { Party } from '../entities/Party';

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
