# Ethereal Portraits — minimal Next.js demo

This project is a small Next.js + Tailwind frontend that saves portrait requests to Supabase.

## Setup (summary)
1. Create a Supabase project and add a table `requests` (see SQL below).
2. Add environment variables to Vercel / local `.env.local`:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
3. Deploy to Vercel (connect repo) — it will build automatically.

## Supabase table SQL
Use this SQL in Supabase SQL editor:
```sql
create table public.requests (
  id uuid default uuid_generate_v4() primary key,
  name text,
  email text,
  event_date date,
  photo_url text,
  notes text,
  status text,
  created_at timestamptz default now()
);
