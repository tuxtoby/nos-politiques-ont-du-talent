import { supabase } from '../utils/supabase';
import { Politician, Sentence } from '../entities/Politician';
import { PoliticalFigure } from '../entities/PoliticalFigure';
import { politicalSideNames } from '../entities/PoliticalSide';
import { politicalColors } from '../domains/political/colors';
import { PoliticianDto } from './dto/PoliticianDto';
import { SentenceDto } from './dto/SentenceDto';
import { PartyDto } from './dto/PartyDto';
import { PoliticalSideDto } from './dto/PoliticalSideDto';

export async function fetchPoliticians(): Promise<Politician[]> {
  const { data: politiciansData, error: politiciansError } = await supabase
    .from('politicians')
    .select('*');

  if (politiciansError) {
    console.error('Error fetching politicians:', politiciansError);
    return [];
  }

  const politicians = politiciansData as PoliticianDto[];
  const politiciansWithSentences: Politician[] = [];

  for (const politician of politicians) {
    const { data: sentencesData, error: sentencesError } = await supabase
      .from('sentences')
      .select('*')
      .eq('politician_id', politician.id);

    if (sentencesError) {
      console.error(`Error fetching sentences for politician ${politician.id}:`, sentencesError);
      continue;
    }

    const sentences = sentencesData as SentenceDto[];
    const formattedSentences: Sentence[] = sentences.map(sentence => ({
      type: sentence.type,
      fine: sentence.fine,
      prisonTime: sentence.prison_time,
      date: sentence.date,
      source: sentence.source_url
    }));

    politiciansWithSentences.push({
      first_name: politician.first_name,
      last_name: politician.last_name,
      politicalGroup: await getPartyName(politician.party_id),
      politicalSide: politician.political_side_id,
      photo: politician.photo_url || '',
      sentences: formattedSentences
    });
  }

  return politiciansWithSentences;
}

export async function getPoliticalFigures(): Promise<PoliticalFigure[]> {
  const politicians = await fetchPoliticians();
  
  return politicians.map((politician, index) => ({
    id: String(index + 1),
    name: `${politician.first_name} ${politician.last_name}`,
    party: politician.politicalGroup,
    politicalSideName: politicalSideNames[politician.politicalSide],
    politicalColor: politicalColors[politician.politicalSide],
    photo: politician.photo,
    charges: politician.sentences.map(sentence => sentence.type),
    sentenceDuration: politician.sentences.reduce((total, sentence) => total + sentence.prisonTime, 0),
    fine: politician.sentences.reduce((total, sentence) => total + sentence.fine, 0)
  }));
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
    .from('parties')
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

async function getPartyName(partyId: string): Promise<string> {
  const { data, error } = await supabase
    .from('parties')
    .select('name')
    .eq('id', partyId)
    .single();

  if (error) {
    console.error(`Error fetching party name for party ${partyId}:`, error);
    return '';
  }

  return data.name;
}
