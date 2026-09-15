# Publicar a UFFinvest no Netlify

## 1. Código no GitHub
No editor Lovable: canto superior direito → GitHub → Connect to GitHub.
O repositório é criado e sincronizado automaticamente a cada alteração.

## 2. Criar o site no Netlify
Netlify → Add new site → Import an existing project → escolha o repositório.
As configurações já vêm do arquivo `netlify.toml`:

- Build command: `npm run build`
- Publish directory: `dist`

## 3. Variáveis de ambiente (Supabase externo)
Em Site configuration → Environment variables, adicione:

| Nome | Valor |
| --- | --- |
| `VITE_SUPABASE_URL` | URL do projeto Supabase |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | chave publishable/anon |
| `VITE_SUPABASE_PROJECT_ID` | id do projeto |
| `SUPABASE_URL` | mesma URL |
| `SUPABASE_PUBLISHABLE_KEY` | mesma chave publishable/anon |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key (secreta) |

## 4. Banco de dados
Rode as migrations da pasta `supabase/migrations` no seu Supabase externo
(SQL Editor ou `supabase db push`), e crie os buckets `team-photos` e
`publication-pdfs`. Em Authentication → URL Configuration, coloque o
domínio do Netlify em Site URL e em Redirect URLs.
