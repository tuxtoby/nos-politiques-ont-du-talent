import { supabase } from '../../../utils/supabase';
import { SentenceDto } from '../../dto/SentenceDto';

export async function getSentences(): Promise<SentenceDto[]> {
  const { data, error } = await supabase.from('sentences').select('*');

  if (error) {
    console.error('Error fetching sentences:', error);
    return [];
  }

  return data as SentenceDto[];
}

export async function getSentencesByPoliticianId(politicianId: string): Promise<SentenceDto[]> {
  const { data, error } = await supabase
    .from('sentences')
    .select('*')
    .eq('politician_id', politicianId);

  if (error) {
    console.error(`Error fetching sentences for politician ${politicianId}:`, error);
    return [];
  }

  return data as SentenceDto[];
}
