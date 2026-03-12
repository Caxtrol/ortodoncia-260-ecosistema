import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

// Estas variables deben configurarse en el panel de Netlify / Vercel
// Para desarrollo local, se leen del archivo .env
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
