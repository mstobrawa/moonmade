
-- Public product catalog: read-only access
GRANT SELECT ON public.products TO anon;

-- Orders: allow checkout inserts, but no public reads or mutations
GRANT INSERT ON public.orders TO anon;

-- Authenticated access, if used by the application
GRANT SELECT, INSERT, UPDATE, DELETE
ON public.products TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
ON public.orders TO authenticated;

-- Backend service access
GRANT ALL PRIVILEGES ON public.products TO service_role;
GRANT ALL PRIVILEGES ON public.orders TO service_role;
