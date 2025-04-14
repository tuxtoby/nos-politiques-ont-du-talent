import { supabase } from '../../../utils/supabase';
import { PartyDto } from '../../dto/PartyDto';

export async function getParties(): Promise<PartyDto[]> {
  const { data, error } = await supabase
    .from('political_parties')
    .select('*');

  if (error) {
    console.error('Error fetching parties:', error);
    return [];
  }

  return data as PartyDto[];
}