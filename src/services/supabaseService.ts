import { Politician } from '../entities/Politician';
import { Party } from '../entities/Party';
import { Sentence } from '../entities/Sentence';

// Import get operations
import { getPoliticians } from './api/get/getPoliticians';
import { getParties } from './api/get/getParties';
import { getFamilies } from './api/get/getFamilies';
import { getPoliticalSides } from './api/get/getPoliticalSides';
import { getSentences, getSentencesByPoliticianId } from './api/get/getSentences';
import { getPartyName as getPartyNameImpl } from './api/get/getPartyName';

// Import update operations
import { createPolitician as createPoliticianImpl } from './api/update/createPolitician';
import { createSentence as createSentenceImpl } from './api/update/createSentence';

// Re-export all functions
export {
  // Get operations
  getPoliticians,
  getPartyNameImpl as getPartyName,

  // Update operations
  createPoliticianImpl as createPolitician,
  createSentenceImpl as createSentence,
};

export async function fetchPoliticians(): Promise<Politician[]> {
  try {
    const politicians = await getPoliticians();
    const parties = await getParties();
    const families = await getFamilies();
    const sides = await getPoliticalSides();
    const sentencesData = await getSentences();

    // Map the data to create Politician entities
    return politicians
      .map(politician => {
        // Find the party for this politician
        const party = parties.find(p => p.id === politician.party_id);

        if (!party) {
          console.error(`Party not found for politician ${politician.id}`);
          return null;
        }

        // Find the party family for this party
        const family = families.find(f => f.id === party.family_id);

        if (!family) {
          console.error(`Party family not found for party ${party.id}`);
          return null;
        }

        // Find the political side for this party
        const side = sides.find(s => s.id === party.political_side_id);

        if (!side) {
          console.error(`Political side not found for party ${party.id}`);
          return null;
        }

        // Find all sentences for this politician
        const politicianSentences = sentencesData
          .filter(s => s.politician_id === politician.id)
          .map(sentence => ({
            type: sentence.type,
            fine: sentence.fine,
            prisonTime: sentence.prison_time,
            date: sentence.date,
            source: sentence.source_url,
          }));

        // Create the Party entity
        const partyEntity: Party = {
          id: party.id,
          name: party.name,
          abbreviation: party.abbreviation,
          family: {
            id: family.id,
            name: family.name,
            description: family.description,
          },
          politicalSide: {
            id: side.id,
            name: side.name,
          },
          logo_url: party.logo_url,
          start_date: party.start_date,
          end_date: party.end_date,
        };

        return {
          id: politician.id,
          name: politician.first_name + ' ' + politician.last_name,
          party: partyEntity,
          photo: politician.photo_url || '',
          vote_url: politician.vote_url,
          sentences: politicianSentences,
        };
      })
      .filter(politician => politician !== null) as Politician[];
  } catch (error) {
    console.error('Error in fetchPoliticians:', error);
    return [];
  }
}

export async function fetchSentences(politicianId: string): Promise<Sentence[]> {
  const sentencesDto = await getSentencesByPoliticianId(politicianId);

  return sentencesDto.map(sentence => ({
    type: sentence.type,
    fine: sentence.fine,
    prisonTime: sentence.prison_time,
    date: sentence.date,
    source: sentence.source_url,
  }));
}
