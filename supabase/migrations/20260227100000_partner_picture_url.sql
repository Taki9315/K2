-- ============================================================================
-- K2 Commercial Finance - Add contact_picture_url to partner_profiles
-- Migration: 20260227100000_partner_picture_url.sql
-- ============================================================================

-- Add contact picture/headshot URL column
alter table public.partner_profiles
  add column if not exists contact_picture_url text;

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================
