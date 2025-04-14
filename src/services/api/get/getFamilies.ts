import { supabase } from '../../../utils/supabase';
import { PartyFamilyDto } from '../../dto/PartyFamilyDto';

export async function getFamilies(): Promise<PartyFamilyDto[]> {
  const { data, error } = await supabase
    .from('political_party_families')
    .select('*');

  if (error) {
    console.error('Error fetching party families:', error);
    return [];
  }

  return data as PartyFamilyDto[];
}