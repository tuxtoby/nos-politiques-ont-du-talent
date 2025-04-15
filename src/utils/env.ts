// Environment variables utility
// This helps ensure we have consistent access to environment variables

export const env = {
  SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || '',
  SUPABASE_ANON_EMAIL: process.env.REACT_APP_SUPABASE_ANON_EMAIL || '',
  SUPABASE_ANON_PASSWORD: process.env.REACT_APP_SUPABASE_ANON_PASSWORD || '',
};

// Function to check if all required environment variables are set
export function validateEnv(): { valid: boolean; missing: string[] } {
  const required = [
    'SUPABASE_URL',
    'SUPABASE_ANON_KEY',
    'SUPABASE_ANON_EMAIL',
    'SUPABASE_ANON_PASSWORD',
  ];

  const missing = required.filter(key => !env[key as keyof typeof env]);

  return {
    valid: missing.length === 0,
    missing,
  };
}
