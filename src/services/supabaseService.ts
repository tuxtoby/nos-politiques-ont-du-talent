import { Politician } from '../entities/Politician';
import { Party } from '../entities/Party';
import { Sentence } from '../entities/Sentence';
import { supabase } from '../utils/supabase';
import { signInAnonymously } from './authService';
import { PoliticianDto, SentenceDto, PartyDto, PartyFamilyDto, PoliticalSideDto } from './dto';

export async function fetchPoliticians(): Promise<Politician[]> {
  try {
    // Fetch all politicians
    const { data: politiciansData, error: politiciansError } = await supabase
      .from('politicians')
      .select('*');

    if (politiciansError) {
      console.error('Error fetching politicians:', politiciansError);
      return [];
    }

    // Fetch all parties
    const { data: partiesData, error: partiesError } = await supabase
      .from('political_parties')
      .select('*');

    if (partiesError) {
      console.error('Error fetching parties:', partiesError);
      return [];
    }

    // Fetch all party families
    const { data: familiesData, error: familiesError } = await supabase
      .from('political_party_families')
      .select('*');

    if (familiesError) {
      console.error('Error fetching party families:', familiesError);
      return [];
    }

    // Fetch all political sides
    const { data: sidesData, error: sidesError } = await supabase
      .from('political_sides')
      .select('*');

    if (sidesError) {
      console.error('Error fetching political sides:', sidesError);
      return [];
    }

    // Fetch all sentences
    const { data: sentencesData, error: sentencesError } = await supabase
      .from('sentences')
      .select('*');

    if (sentencesError) {
      console.error('Error fetching sentences:', sentencesError);
      return [];
    }

    const politicians = politiciansData as PoliticianDto[];
    const parties = partiesData as PartyDto[];
    const families = familiesData as PartyFamilyDto[];
    const sides = sidesData as PoliticalSideDto[];
    const sentences = sentencesData as SentenceDto[];

    // Map the data to create Politician entities
    return politicians.map(politician => {
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
      const politicianSentences = sentences
        .filter(s => s.politician_id === politician.id)
        .map(sentence => ({
          type: sentence.type,
          fine: sentence.fine,
          prisonTime: sentence.prison_time,
          date: sentence.date,
          source: sentence.source_url
        }));

      // Create the Party entity
      const partyEntity: Party = {
        id: party.id,
        name: party.name,
        abbreviation: party.abbreviation,
        family: {
          id: family.id,
          name: family.name,
          description: family.description
        },
        politicalSide: {
          id: side.id,
          name: side.name
        },
        logo_url: party.logo_url,
        start_date: party.start_date,
        end_date: party.end_date
      };

      return {
        id: politician.id,
        name: politician.first_name + ' ' + politician.last_name,
        party: partyEntity,
        photo: politician.photo_url || '',
        sentences: politicianSentences
      };
    }).filter(politician => politician !== null) as Politician[];
  } catch (error) {
    console.error('Error in fetchPoliticians:', error);
    return [];
  }
}

export async function fetchPoliticalSides(): Promise<PoliticalSideDto[]> {
  const { data, error } = await supabase
    .from('political_sides')
    .select('*');

  if (error) {
    console.error('Error fetching political sides:', error);
    return [];
  }

  return data as PoliticalSideDto[];
}

export async function fetchParties(): Promise<PartyDto[]> {
  const { data, error } = await supabase
    .from('political_parties')
    .select('*');

  if (error) {
    console.error('Error fetching parties:', error);
    return [];
  }

  return data as PartyDto[];
}

export async function fetchSentences(politicianId: string): Promise<Sentence[]> {
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('politician_id', politicianId);

  if (error) {
    console.error(`Error fetching sentences for politician ${politicianId}:`, error);
    return [];
  }

  const sentencesDto = data as SentenceDto[];
  return sentencesDto.map(sentence => ({
    type: sentence.type,
    fine: sentence.fine,
    prisonTime: sentence.prison_time,
    date: sentence.date,
    source: sentence.source_url
  }));
}

export async function createPolitician(
  firstName: string,
  lastName: string,
  partyId: string,
  politicalSideId: number,
  photoUrl?: string
): Promise<{ success: boolean; error?: string; politician?: PoliticianDto }> {
  try {   
    // Always attempt anonymous sign-in before creating a politician
    console.log('Starting politician creation process');
    const signInResult = await signInAnonymously();
    
    if (!signInResult.success) {
      console.error('Failed to authenticate:', signInResult.error);
      return { 
        success: false, 
        error: `Authentication failed: ${signInResult.error}` 
      };
    }
    
    console.log('Authentication successful, proceeding with politician creation');

    // Now try to insert the data
    const { data, error } = await supabase
      .from('politicians')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          party_id: partyId,
          political_side_id: politicalSideId,
          photo_url: photoUrl || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating politician:', error);
      return { success: false, error: error.message };
    }

    console.log('Politician created successfully:', data);
    return { success: true, politician: data as PoliticianDto };
  } catch (error) {
    console.error('Exception creating politician:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function createSentence(
  politicianId: string,
  type: string,
  fine: number,
  prisonTime: number,
  date: string,
  sourceUrl?: string
): Promise<{ success: boolean; error?: string; sentence?: SentenceDto }> {
  try {
    // Always attempt anonymous sign-in before creating a sentence
    console.log('Starting sentence creation process');
    const signInResult = await signInAnonymously();
    
    if (!signInResult.success) {
      console.error('Failed to authenticate:', signInResult.error);
      return { 
        success: false, 
        error: `Authentication failed: ${signInResult.error}` 
      };
    }
    
    console.log('Authentication successful, proceeding with sentence creation');

    // Now try to insert the data
    const { data, error } = await supabase
      .from('sentences')
      .insert([
        {
          politician_id: politicianId,
          type: type,
          fine: fine,
          prison_time: prisonTime,
          date: date,
          source_url: sourceUrl || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating sentence:', error);
      return { success: false, error: error.message };
    }

    console.log('Sentence created successfully:', data);
    return { success: true, sentence: data as SentenceDto };
  } catch (error) {
    console.error('Exception creating sentence:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

async function getPartyName(partyId: string): Promise<string> {
  const { data, error } = await supabase
    .from('political_parties')
    .select('name')
    .eq('id', partyId)
    .single();

  if (error || !data) {
    console.error(`Error fetching party name for ID ${partyId}:`, error);
    return 'Unknown Party';
  }

  return data.name;
}
