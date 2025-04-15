import { supabase } from '../../../utils/supabase';
import { PoliticianDto } from '../../dto/PoliticianDto';
import { signInAnonymously } from '../../authService';

export async function createPolitician(
  firstName: string,
  lastName: string,
  partyId: string,
  politicalSideId: number,
  photoUrl?: string,
  voteUrl?: string
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
          photo_url: photoUrl || null,
          vote_url: voteUrl || null
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
