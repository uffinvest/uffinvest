
-- 1) Profiles: add email + can_publish
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS can_publish boolean NOT NULL DEFAULT false;

-- Backfill emails from auth.users
UPDATE public.profiles p SET email = u.email
FROM auth.users u WHERE p.id = u.id AND p.email IS NULL;

-- 2) handle_new_user: also set email, and auto-grant admin to uffinvest@gmail.com
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;

  IF NEW.email = 'uffinvest@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Ensure trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- If admin already exists in auth.users, grant role now
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE email = 'uffinvest@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- 3) Profiles policies: admin can update any profile
DROP POLICY IF EXISTS "Admin atualiza qualquer profile" ON public.profiles;
CREATE POLICY "Admin atualiza qualquer profile" ON public.profiles
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4) user_roles: admin sees all, admin manages
DROP POLICY IF EXISTS "Usuários veem seus papéis" ON public.user_roles;
CREATE POLICY "Veem próprios ou admin vê todos" ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin insere roles" ON public.user_roles;
CREATE POLICY "Admin insere roles" ON public.user_roles
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin remove roles" ON public.user_roles;
CREATE POLICY "Admin remove roles" ON public.user_roles
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 5) Publications INSERT: only admin or users with can_publish
DROP POLICY IF EXISTS "Autenticados publicam como si mesmos" ON public.publications;
CREATE POLICY "Publicadores autorizados" ON public.publications
FOR INSERT TO authenticated
WITH CHECK (
  auth.uid() = author_id AND (
    public.has_role(auth.uid(), 'admin')
    OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND can_publish = true)
  )
);

-- 6) team_members table
CREATE TABLE IF NOT EXISTS public.team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  image_url text,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.team_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Equipe pública" ON public.team_members;
CREATE POLICY "Equipe pública" ON public.team_members FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin insere equipe" ON public.team_members;
CREATE POLICY "Admin insere equipe" ON public.team_members
FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin atualiza equipe" ON public.team_members;
CREATE POLICY "Admin atualiza equipe" ON public.team_members
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admin remove equipe" ON public.team_members;
CREATE POLICY "Admin remove equipe" ON public.team_members
FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- updated_at trigger fn
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

DROP TRIGGER IF EXISTS update_team_members_updated_at ON public.team_members;
CREATE TRIGGER update_team_members_updated_at
BEFORE UPDATE ON public.team_members
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 7) Seed initial team
INSERT INTO public.team_members (name, role, position)
SELECT * FROM (VALUES
  ('Ana Beatriz Costa', 'Presidente', 1),
  ('Ricardo Mendes', 'Diretor Macro', 2),
  ('Felipe Arantes', 'Diretor de Equities', 3),
  ('Juliana Soares', 'Diretora de RH', 4),
  ('Lucas Pereira', 'Diretor Financeiro', 5),
  ('Beatriz Lima', 'Diretora de Marketing', 6),
  ('Gabriel Souza', 'Analista Sênior Macro', 7),
  ('Isabela Martins', 'Analista Sênior Equities', 8)
) AS v(name, role, position)
WHERE NOT EXISTS (SELECT 1 FROM public.team_members);
