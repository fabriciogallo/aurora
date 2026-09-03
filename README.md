# Aurora — Landing Page

Landing page da Aurora (RH as a Service), em HTML + CSS + JS puros — sem
framework, sem build step. Basta abrir com um servidor estático.

**Ao vivo:** [fabriciogallo.github.io/aurora](https://fabriciogallo.github.io/aurora/) (GitHub Pages)

## Estrutura de arquivos

```
AURORA/
├── index.html        Marcação da página (todas as seções)
├── style.css          Todo o CSS: reset, animações, responsividade e
│                       classes de estilo de cada elemento
├── script.js           Toda a interatividade (ver "Funcionalidades")
├── icons.js             Módulo ES com os ícones e logos em SVG (viewBox + path)
├── support.js            Não usado — script do Figma Design Canvas mantido
│                            só como referência histórica do arquivo original
└── assets/
    ├── logo-aurora.png
    ├── hero.png
    ├── demo.png
    ├── features.png
    └── avatar-1.jpg / avatar-2.png / avatar-3.png / avatar-4.png
```

## Como rodar localmente

O `script.js` usa `import()` dinâmico (ES module) para carregar `icons.js`,
então o arquivo precisa ser servido por http(s) — abrir direto como
`file://` não funciona (bloqueio de CORS do navegador). Qualquer servidor
estático resolve:

```bash
npx serve .
```

Ou, com Python:

```bash
python -m http.server 5566
```

Depois acesse `http://localhost:<porta>/`.

## Seções da página

| Seção | `id` | Descrição |
|---|---|---|
| Header | — | Logo, menu (scroll suave) e CTA fixos no topo |
| Hero | `#top` | Título, CTAs e ilustração com cards flutuantes |
| Logos | — | Carrossel infinito (CSS puro) de logos de clientes |
| Demo | — | Frame com botão que abre o modal de vídeo |
| Produtos | `#produtos` | Cards de funcionalidades (2 colunas) |
| Simulador Boreal | `#boreal` | Chat simulado com o assistente de IA |
| Depoimentos | — | Grid de cards de clientes |
| Planos | `#planos` | Toggle mensal/anual e comparação de planos |
| Contato | `#contato` | Formulário em 4 etapas + agendamento |

## Funcionalidades (`script.js`)

- **Navegação** — scroll suave para as âncoras, com deslocamento pela
  altura do header fixo (`initNav`).
- **Ícones** — `icons.js` é importado dinamicamente; cada `<span data-icon="nome">`
  vira um `<svg>` (`mountIcons`). Ver [Ícones](#ícones-e-logos) abaixo.
- **Modal de vídeo** — abre/fecha via classe `.hidden` (`initVideoModal`).
- **Planos** — alterna preços e estilo das abas mensal/anual (`initPlanToggle`).
- **Chat do Boreal** — simula uma conversa: respostas pré-definidas para as
  sugestões rápidas, indicador de "digitando" e fallback genérico para
  qualquer outra mensagem (`initChat`).
- **Calendário** — grade de dias/horários gerada dinamicamente a partir da
  data atual, navegação entre meses, geração do link de agendamento no
  Google Agenda (`renderCalendar`, `gcalUrl`).
- **Formulário de contato** — 4 etapas com validação por etapa (nome/empresa,
  e-mail/telefone, porte da empresa, data/hora), mensagens de erro e reset
  ao concluir (`initContactForm`).
- **Ajuste de escala** — entre 1280px e 1920px de largura, a página inteira
  é escalada (`transform: scale()`) para caber sem quebrar o layout fixo de
  1920px; abaixo de 1280px assume o layout responsivo definido em
  `style.css` (`initFit`).

## Ícones e logos

Todos os ícones e logos de clientes vêm de `icons.js`, um dicionário
`{ "nome-do-icone": { viewBox, body } }`. No HTML, um espaço reservado assim:

```html
<span data-icon="ic-send" data-icon-color="rgb(255,255,255)"></span>
```

é convertido em SVG no carregamento da página. Para trocar a cor de um
ícone, edite o atributo `data-icon-color`; para ícones com mais de uma cor
(como o robô do chat), use `data-icon-fills="cor1,cor2"`.

Para adicionar um novo ícone: inclua a entrada em `icons.js` e referencie o
nome em um `data-icon` no HTML.

## CSS — convenção de nomes

Cada elemento visual tem uma classe própria em `style.css`, nomeada por
seção + papel (ex.: `.hero-title`, `.chat-bubble-bot`, `.plan-card-boreal`,
`.calendar-summary`). Além dessas, existem classes utilitárias reaproveitadas
em vários lugares:

- `.hidden` — `display: none` forçado (usado por JS para mostrar/ocultar)
- `.nav-link-text`, `.stat-number`, `.col-start`, `.no-shrink` — estilos
  repetidos entre seções diferentes
- Classes de interação (`.hover`/`.focus`), como `.btn-cta-hero:hover`,
  `.input-focus-pink:focus`, `.cal-day:hover` — reúnem os estados que no
  arquivo original eram atributos `style-hover`/`style-focus`

Os seletores de atributo `[data-r="..."]` no topo de `style.css` são só
para as *media queries* responsivas (abaixo de 1280px e 560px) — não
remova os atributos `data-r` do HTML, mesmo que pareçam não ter estilo
próprio.

## Acessibilidade

A página foi revisada e ajustada para pessoas que navegam por teclado, usam
leitor de tela ou têm preferência por menos animação:

- **Skip link** — primeiro elemento focável da página; leva direto para
  `#main-content`, pulando o menu.
- **Landmarks semânticos** — `<header>`, `<main>`, `<nav>` (com
  `aria-label` distinguindo o menu principal do rodapé) e `<footer>`, para
  navegação por região no leitor de tela.
- **Foco de teclado visível** — `:focus-visible` em toda a página; os campos
  de formulário e o input do chat (que tinham o contorno padrão removido)
  ganharam um anel de foco próprio.
- **Etapas do formulário** — os indicadores de etapa viraram `<button>` de
  verdade (antes eram `<div>` com clique — inacessíveis por teclado), com
  `aria-current="step"` na etapa ativa.
- **Calendário de agendamento** — cada dia tem `aria-label` com a data por
  extenso (ex. "3 de setembro de 2026") em vez de só o número; dias e
  horários usam `aria-pressed` para indicar seleção; o foco é preservado ao
  clicar (a grade é reconstruída a cada seleção, o que por padrão jogaria o
  foco de volta pro topo da página).
- **Modal de vídeo** — `role="dialog"` + `aria-modal`, foco preso dentro do
  modal (Tab não escapa para o conteúdo por trás), fecha com `Esc`, devolve
  o foco a quem abriu o modal, e usa `inert` no restante da página enquanto
  está aberto.
- **Regiões dinâmicas anunciadas** — o log do chat (`role="log"`), o
  indicador de "digitando", a mensagem de validação do formulário e o
  resumo do agendamento usam `aria-live` para serem lidos automaticamente
  pelo leitor de tela.
- **Ícones decorativos ocultos** — todo ícone/SVG gerado por `data-icon` (e
  os decorativos do rodapé) recebe `aria-hidden="true"`, já que a
  informação real está no texto ou no `aria-label` do elemento pai.
- **Menos movimento** — respeita `prefers-reduced-motion: reduce` do
  sistema operacional, desligando o carrossel de logos, as animações de
  flutuação/piscar e o scroll suave para quem ativou essa preferência.
- **Contraste** — os textos cinza-claro (status "Online agora", dias da
  semana do calendário, rodapé) foram escurecidos de `rgb(132,123,140)`
  para `rgb(108,100,116)` para atingir 4.5:1 (WCAG AA).
- **Campos obrigatórios** marcados com `required` nativo (nome, empresa,
  e-mail, quantidade de colaboradores).

### Limitação conhecida

Alguns textos de destaque usam as cores de marca rosa/roxo
(`rgb(226,61,116)`, `rgb(208,69,147)`) sobre fundo branco — contraste em
torno de 4.0–4.3:1, um pouco abaixo do 4.5:1 recomendado pelo WCAG AA para
texto pequeno (ex.: "Simule uma conversa agora", texto do botão "Veja como
funciona"). Não escurecemos essas cores porque são a identidade visual da
marca e a mudança afetaria vários pontos do design; se isso for um
requisito obrigatório, a correção é trocar essas duas cores por tons
levemente mais escuros (ex. `rgb(196,40,95)` / `rgb(178,49,127)`) em
`style.css`.

## Histórico

Este projeto começou como um artboard do **Figma** . Foi convertido para
HTML/CSS/JS padrão para poder ser hospedado em qualquer lugar, editado em
qualquer editor de código e rodar sem nenhuma ferramenta proprietária.

### Roadmap da atividade (Grupo 11 — 17/08/2026)

Planejamento original da atividade, do grupo responsável pelo projeto:

| Fase | Período | Atividades | Resultado esperado | 
|---|---|---|---|
| **Descoberta** | 17 a 21/08 | Revisar a solução da Etapa 1; analisar o feedback recebido; entender o público B2B da Aurora; identificar dores; mapear necessidades e expectativas; pesquisar concorrentes e soluções similares; identificar oportunidades de diferenciação; levantar dados/referências que sustentem as decisões | Mapa de oportunidades; análise da interface atual; diagnóstico com argumentos; benchmarking | 
| **Definição das funcionalidades** | 24/08 | Definir problema principal, público prioritário, persona/protopersona B2B, proposta de valor, diferencial, CTA principal, ação desejada do usuário e hipótese de valor | Lista de definições do que será feito; frase que define o projeto ("Para [público], que enfrenta [problema], a Aurora oferece [solução], permitindo [benefício].") | 
| **Desenhar a solução** | 25 a 28/08 | Mapear jornada e criar user flow; definir arquitetura e hierarquia de conteúdo; criar wireframes; definir estados de interação e mensagens de feedback; definir formulário e CTA | Jornada e fluxo; interface | 
| **Desenvolvimento + testes** | 31/08 a 07/09 | Publicar a landing page com URL pública (Vercel, Netlify, Firebase Hosting ou similar); garantir responsividade para diferentes tamanhos de dispositivo; garantir que tudo funciona antes da entrega | Landing funcional; testes; deploy |
| **Documentar** | 07 a 09/09 | Consolidar todo o conteúdo em PDF; atualizar o Read.me; montar apresentação; entregar a atividade | Apresentação montada; atividade entregue |

