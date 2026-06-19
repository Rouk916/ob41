-- ════════════════════════════════════════════════════════════════
--  OBI41 — Schéma de base de données Supabase
--  À exécuter une seule fois dans : Supabase > SQL Editor > New query
-- ════════════════════════════════════════════════════════════════

-- ── Table des disponibilités (gérée par le DJ) ──
create table if not exists public.availability (
  date       text primary key,            -- ex: "2026-6-14"
  slots      jsonb not null,              -- ex: {"17h00": true, "18h00": false}
  updated_at timestamptz not null default now()
);

-- ── Table des réservations (envoyées par les visiteurs) ──
create table if not exists public.bookings (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  nom            text,
  email          text,
  telephone      text,
  type           text,
  duree          text,
  lieu           text,
  message        text,
  date_reservee  text,
  heure_reservee text
);

-- ── Sécurité au niveau des lignes (RLS) ──
alter table public.availability enable row level security;
alter table public.bookings     enable row level security;

-- Tout le monde peut LIRE les disponibilités (calendrier public)
create policy "Disponibilites lisibles par tous"
  on public.availability for select
  to anon, authenticated using (true);

-- Seul le DJ connecté peut MODIFIER les disponibilités
create policy "DJ gere les disponibilites"
  on public.availability for all
  to authenticated using (true) with check (true);

-- Les visiteurs peuvent ENVOYER une demande de réservation
create policy "Visiteurs envoient une reservation"
  on public.bookings for insert
  to anon, authenticated with check (true);

-- Seul le DJ connecté peut LIRE les réservations reçues
create policy "DJ lit les reservations"
  on public.bookings for select
  to authenticated using (true);
