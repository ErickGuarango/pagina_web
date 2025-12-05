/* ============================================
   CONFIGURACIÓN SUPABASE - InarexSoft
   Archivo: supabaseConfig.js
   ============================================ */

// Obtén estos valores de:
// Supabase Dashboard → Settings → API

export const SUPABASE_CONFIG = {
    url: 'https://zctvtlpkxgruwfnrguwn.supabase.co',  // ← Tu Project URL
    anonKey: 'sb_publishable_JobFFPQlM0FtXyLGlqlNZw_mLi6ERoh',  // ← Tu Publishable Key
    tabla: 'cotizaciones',
    emailDestino: 'inarexsoft@gmail.com'
};

// Crear cliente Supabase
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const supabase = createClient(
    SUPABASE_CONFIG.url,
    SUPABASE_CONFIG.anonKey
);

console.log('✅ Supabase configurado');