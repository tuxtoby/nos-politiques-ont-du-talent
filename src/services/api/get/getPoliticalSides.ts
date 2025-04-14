import { supabase } from '../../../utils/supabase';
import { PoliticalSideDto } from '../../dto/PoliticalSideDto';

export async function getPoliticalSides(): Promise<PoliticalSideDto[]> {
  const { data, error } = await supabase
    .from('political_sides')
    .select('*');

  if (error) {
    console.error('Error fetching political sides:', error);
    return [];
  }

  return data as PoliticalSideDto[];
}