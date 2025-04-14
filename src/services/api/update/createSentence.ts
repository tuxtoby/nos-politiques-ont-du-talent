import { supabase } from '../../../utils/supabase';
import { SentenceDto } from '../../dto/SentenceDto';
import { signInAnonymously } from '../../authService';

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
