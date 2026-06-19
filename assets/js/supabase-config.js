// ════════════════════════════════════════════════════════════
//  Configuration Supabase
//  ⚠️ REMPLACE les deux valeurs ci-dessous par celles de TON projet :
//  Supabase > Project Settings > API > Project URL + anon public key
//  (La clé "anon public" est conçue pour être publique — la sécurité
//   est assurée par les règles RLS définies dans supabase-schema.sql)
// ════════════════════════════════════════════════════════════
const SUPABASE_URL = 'https://qygrifbopyqbkqzgosml.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_-cKpI03YtCmb3ktb725j6A_bsJwZqtB';

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


