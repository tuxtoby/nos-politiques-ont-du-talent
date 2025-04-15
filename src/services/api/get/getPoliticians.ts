import { supabase } from '../../../utils/supabase';
import { PoliticianDto } from '../../dto/PoliticianDto';

export async function getPoliticians(): Promise<PoliticianDto[]> {
  const { data, error } = await supabase.from('politicians').select('*');

  if (error) {
    console.error('Error fetching politicians:', error);
    return [];
  }

  return data as PoliticianDto[];
}
