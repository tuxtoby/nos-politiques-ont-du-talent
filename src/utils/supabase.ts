import { createClient } from '@supabase/supabase-js';
import { Database } from '../services/supabase';
import { env, validateEnv } from './env';

// Validate environment variables
const envValidation = validateEnv();
if (!envValidation.valid) {
  console.error('Missing required environment variables:', envValidation.missing);
}

const supabaseUrl = env.SUPABASE_URL;
const supabaseAnonKey = env.SUPABASE_ANON_KEY;

console.log('Initializing Supabase client with URL:', supabaseUrl);
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
