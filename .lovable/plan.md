# Corrigir a falha de instalação no Netlify

## O que está causando o erro

O projeto tem **dois arquivos de trava de dependências**:

- `bun.lock` — atualizado, coerente com o `package.json` atual (config 2.13.1 + nitro 3.0.260603-beta).
- `package-lock.json` — **desatualizado**, sobrou do modelo original do projeto. Dentro dele o projeto ainda pede `@lovable.dev/vite-tanstack-config` na versão `^1.7.0` (resolvida para 1.8.0, que exige `nitro 3.0.260429-beta`).

O Netlify roda `npm install`, e o npm lê o `package-lock.json`. Ele encontra a exigência antiga (1.8.0 + nitro antigo) brigando com a exigência atual do `package.json` (2.13.1 + nitro novo) e aborta com `ERESOLVE`. Não é a alteração de roteamento que introduziu isso — o `vite.config.ts` só ganhou a condição de build do Netlify; o problema é a trava antiga que nunca foi regenerada e que agora passou a ser usada pelo Netlify.

## O que vai mudar

1. Apagar o `package-lock.json` antigo e gerar um novo a partir do `package.json` atual, no registro público do npm, com a versão única `2.13.1` e `nitro 3.0.260603-beta`.
2. Conferir que não resta nenhuma outra exigência da versão 1.x no novo arquivo.
3. Fixar no `netlify.toml` o uso de `npm ci` (instalação exata pela trava) para evitar resoluções improvisadas no servidor de build.
4. Rodar o build no mesmo formato do Netlify para confirmar que passa sem erros antes de você publicar de novo.

Nada do site muda: páginas, login, publicações e área de administrador continuam iguais.

## Detalhes técnicos

- `rm package-lock.json && npm install --package-lock-only --registry=https://registry.npmjs.org` para regenerar a árvore v3 sem tocar em `node_modules` (o sandbox continua com bun).
- Verificar `grep vite-tanstack-config package-lock.json` — só deve aparecer `2.13.1`; e `nitro` resolvido em `3.0.260603-beta`.
- `bun.lock` é mantido para o ambiente Lovable; o Netlify detecta o `package-lock.json` e usa npm.
- `netlify.toml`: `command = "npm ci && npm run build"`.
- Validação: `env -u LOVABLE_SANDBOX NETLIFY=true npx vite build` deve gerar `dist/client`, `dist/server` e `.netlify/functions-internal`.
