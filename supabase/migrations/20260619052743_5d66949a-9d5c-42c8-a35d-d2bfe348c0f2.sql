
-- ALUMNI
CREATE TABLE public.alumni (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  year text NOT NULL,
  quote text NOT NULL,
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.alumni TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.alumni TO authenticated;
GRANT ALL ON public.alumni TO service_role;
ALTER TABLE public.alumni ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Alumni público" ON public.alumni FOR SELECT USING (true);
CREATE POLICY "Admin insere alumni" ON public.alumni FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin atualiza alumni" ON public.alumni FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin remove alumni" ON public.alumni FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_alumni_updated_at BEFORE UPDATE ON public.alumni FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.alumni (name, role, year, quote, position) VALUES
('Mariana Silva','Analista de Equity — BTG Pactual','Egressa 2022','A UFFinvest foi o diferencial na minha preparação técnica para o mercado. O rigor das discussões de comitê me deu a base para atuar hoje em Asset Management.',1),
('Ricardo Fontes','Associate — J.P. Morgan','Egresso 2021','O networking e o aprendizado prático em modelagem financeira foram fundamentais para minha transição para Investment Banking.',2),
('Camila Rocha','Trader — XP Investimentos','Egressa 2023','Aprendi mais sobre macroeconomia em um semestre na liga do que em anos de teoria. Comitês reais, decisões reais.',3);

-- SECTORS
CREATE TABLE public.sectors (
  slug text PRIMARY KEY,
  tag text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL DEFAULT 'FileText',
  bullets text[] NOT NULL DEFAULT '{}',
  position integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.sectors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.sectors TO authenticated;
GRANT ALL ON public.sectors TO service_role;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Sectors público" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Admin insere sector" ON public.sectors FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin atualiza sector" ON public.sectors FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admin remove sector" ON public.sectors FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON public.sectors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.sectors (slug,tag,title,description,icon,bullets,position) VALUES
('carta-macro','Relatório Mensal','Carta Macro','Publicação mensal com a leitura da liga sobre o cenário macroeconômico doméstico e global.','FileText','{"Indicadores BR e globais","Cenário fiscal e monetário","Calls de posicionamento"}',1),
('analise-macroeconomica','Research','Análise Macroeconômica','Estudos aprofundados sobre temas estruturais: política fiscal, reformas, commodities e geopolítica.','LineChart','{"Deep-dives temáticos","Modelagem de cenários","Comitê macro semanal"}',2),
('analise-fundamentalista','Equity Research','Análise Fundamentalista','Teses de investimento sobre empresas listadas na B3, com modelagem por DCF e múltiplos.','Building2','{"Valuation por DCF","Modelagem operacional","Teses long e short"}',3);
