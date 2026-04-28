-- Profiles table for checkout leads
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow anyone (anon) to insert a new lead from the checkout modal
CREATE POLICY "Anyone can create a checkout lead"
  ON public.profiles
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Deny public reads (PII protection). Only service role bypasses RLS.
CREATE POLICY "No public read access to leads"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (false);

-- Helpful index on email for lookups
CREATE INDEX profiles_email_idx ON public.profiles (email);
CREATE INDEX profiles_created_at_idx ON public.profiles (created_at DESC);