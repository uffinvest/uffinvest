# UFFinvest — Design System v1.0

Este arquivo é a fonte de verdade visual do projeto.
Todo prompt futuro deve referenciar e respeitar estas regras.

---

## Identidade Visual

O site da UFFinvest comunica **excelência, rigor e ambição**.
A referência visual é um fundo azul-noite profundo (extraído da imagem do touro da hero),
com acentos em dourado. Sóbrio, premium, sem excessos.

---

## Paleta de Cores

```css
--color-bg-primary:    #080F1E;   /* azul-noite — fundo principal */
--color-bg-secondary:  #0D1628;   /* cards e seções alternadas */
--color-bg-elevated:   #112040;   /* elementos elevados, hover states */
--color-border:        rgba(255, 255, 255, 0.07);
--color-border-accent: rgba(200, 168, 75, 0.25);

--color-accent:        #C8A84B;   /* dourado UFFinvest */
--color-accent-hover:  #DFC06A;
--color-accent-subtle: rgba(200, 168, 75, 0.08);

--color-text-primary:  #EAE6DD;   /* quase branco quente */
--color-text-secondary:#7A8BA8;   /* azul-acinzentado para suporte */
--color-text-muted:    #3A4A62;

--color-success:       #22C55E;
```

## Tipografia

- **Display (H1, H2):** Playfair Display — importar do Google Fonts
  - H1: 60px, weight 700, italic, letter-spacing -0.02em
  - H2: 42px, weight 700, letter-spacing -0.01em
- **UI (H3, body, botões):** Inter — já no projeto
  - H3: 22px, weight 600
  - Body: 16px, weight 400, line-height 1.7
  - Caption/label: 11px, weight 600, uppercase, letter-spacing 0.12em

Palavra de destaque nos títulos: envolva em `<em>` com cor `--color-accent` e Playfair italic.

## Espaçamento

- Unidade base: 8px (sistema 8pt grid)
- Padding vertical de seções: 120px
- Container máximo: 1200px com padding lateral 24px
- Gap entre cards: 24px
- Border-radius cards: 12px
- Border-radius botões: 6px

## Botões

- **Primary:** fundo `--color-accent`, texto `#080F1E`, padding 14px 28px, weight 600
- **Secondary:** fundo transparente, borda 1px `--color-accent`, texto `--color-accent`
- **Ghost:** sem borda, texto `--color-text-secondary`, underline no hover

Todos: `transition: all 0.2s ease` + `transform: translateY(-1px)` no hover.

## Cards

- Fundo: `--color-bg-secondary`
- Borda: `1px solid var(--color-border)`
- Border-radius: 12px, padding: 32px
- Hover: borda muda para `--color-border-accent`, box-shadow `0 0 0 1px rgba(200,168,75,0.15), 0 8px 32px rgba(0,0,0,0.5)`
- Transição: 0.25s ease

## Animações

Usar Framer Motion em todos os elementos de conteúdo:

- **Fade-up on scroll:** opacity 0→1 + translateY 24px→0, duração 0.6s, easing easeOut
- **Stagger em grids:** delay incremental de 0.1s por item
- **Linha de acento:** abaixo de cada label de seção, linha de 40px em `--color-accent` cresce da esquerda em 0.4s
- **Navbar scroll:** após 80px, `backdrop-filter: blur(20px)` + fundo `rgba(8,15,30,0.88)` + borda inferior sutil

## Labels de Seção

Padrão para identificadores de seção:

- 11px, uppercase, letter-spacing 0.12em, weight 600, cor `--color-accent`
- Prefixo `—` em dourado
- 16px de margin-bottom antes do H2

## Regra geral

Todo componente novo ou editado deve seguir este sistema. Nunca usar cores hardcoded — sempre referenciar as CSS variables acima.
