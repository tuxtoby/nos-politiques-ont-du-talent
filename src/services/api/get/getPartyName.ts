import { supabase } from '../../../utils/supabase';

export async function getPartyName(partyId: string): Promise<string> {
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
