
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://miyqdfjfphrbusfnijur.supabase.co';

/**
 * Validates if a string looks like a potential Supabase JWT/Key.
 * Supabase keys are long strings that don't contain placeholders like "process.env".
 */
const isValidSupabaseKey = (key: string | undefined): boolean => {
  if (!key) return false;
  if (key.includes('process.env')) return false;
  if (key === 'ANON_KEY_NOT_FOUND') return false;
  if (key.length < 40) return false; // Typical Supabase keys are very long
  return true;
};

// Access environment variables with fallbacks
const getSupabaseKey = (): string => {
  // 1. Try Vite environment variable
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_KEY) {
    return (import.meta as any).env.VITE_SUPABASE_KEY;
  }
  
  // 2. Try Node/Common environment variable
  if (typeof process !== 'undefined' && process.env?.SUPABASE_KEY) {
    return process.env.SUPABASE_KEY;
  }

  return '';
};

const rawKey = getSupabaseKey();
const isKeyConfigured = isValidSupabaseKey(rawKey);

// CRITICAL: If the key is invalid, we use a specific placeholder that Supabase handles better
// than "process.env.SUPABASE_KEY" which causes the JWS error.
// However, we still export the client so the app doesn't crash on import.
export const supabase = createClient(supabaseUrl, isKeyConfigured ? rawKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dummy_key');

export const isSupabaseReady = isKeyConfigured;

// Helper to get public URLs based on the structure requested
export const getStorageUrl = (bucket: string, path: string) => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};
