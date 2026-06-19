
-- Add new columns to publications
ALTER TABLE public.publications
  ADD COLUMN IF NOT EXISTS authors text,
  ADD COLUMN IF NOT EXISTS pdf_url text;

-- Limit summary to 200 chars at DB level via trigger (CHECK is fine here since static)
ALTER TABLE public.publications
  ADD CONSTRAINT publications_summary_max_200 CHECK (summary IS NULL OR char_length(summary) <= 200);

-- Storage policies: team-photos (admins write, anyone read)
CREATE POLICY "team-photos read public"
ON storage.objects FOR SELECT
USING (bucket_id = 'team-photos');

CREATE POLICY "team-photos admin write"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'team-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "team-photos admin update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'team-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "team-photos admin delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'team-photos' AND public.has_role(auth.uid(), 'admin'));

-- publication-pdfs: anyone read, authorized publishers/admins write own
CREATE POLICY "publication-pdfs read public"
ON storage.objects FOR SELECT
USING (bucket_id = 'publication-pdfs');

CREATE POLICY "publication-pdfs publisher write"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'publication-pdfs' AND (
    public.has_role(auth.uid(), 'admin') OR EXISTS (
      SELECT 1 FROM public.profiles WHERE id = auth.uid() AND can_publish = true
    )
  )
);

CREATE POLICY "publication-pdfs author update"
ON storage.objects FOR UPDATE TO authenticated
USING (
  bucket_id = 'publication-pdfs' AND (
    public.has_role(auth.uid(), 'admin') OR owner = auth.uid()
  )
);

CREATE POLICY "publication-pdfs author delete"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'publication-pdfs' AND (
    public.has_role(auth.uid(), 'admin') OR owner = auth.uid()
  )
);
