import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://miyqdfjfphrbusfnijur.supabase.co';

// Robust environment variable access for both Vite and Node environments
let supabaseKey = 'process.env.SUPABASE_KEY';

// Check import.meta.env (Vite)
if (import.meta && (import.meta as any).env) {
  supabaseKey = (import.meta as any).env.VITE_SUPABASE_KEY || '';
}

// Fallback to process.env if available (legacy/standard Node)
if (!supabaseKey && typeof process !== 'undefined' && process.env) {
  supabaseKey = process.env.SUPABASE_KEY || 'process.env.SUPABASE_KEY';
}

// CRITICAL FIX: createClient throws if key is empty. 
// We use a placeholder to allow the app to initialize even if the Env Var is missing.
// API calls will fail with 401/403 but the UI will render.
const finalKey = supabaseKey || 'ANON_KEY_NOT_FOUND';

if (finalKey === 'ANON_KEY_NOT_FOUND') {
  console.warn('Supabase Key is missing. Please add VITE_SUPABASE_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, finalKey);

// Helper to get public URLs based on the structure requested
export const getStorageUrl = (bucket: string, path: string) => {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
};