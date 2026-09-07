// Aurora landing page — behavior extracted from the original design-canvas component.

const BOT_BUBBLE = {
  maxWidth: "567px", borderRadius: "16px 16px 16px 4px",
  background: "rgba(181,239,214,0.3)", border: "1px solid rgb(181,239,214)",
  padding: "12px 16px", fontWeight: "500", fontSize: "15px", lineHeight: "23.25px",
  color: "rgb(27,21,35)", whiteSpace: "pre-line", textWrap: "pretty"
};
const USER_BUBBLE = {
  maxWidth: "480px", borderRadius: "16px 16px 4px 16px",
  background: "rgba(245,168,200,0.35)", border: "1px solid rgb(245,168,200)",
  padding: "12px 16px", fontWeight: "500", fontSize: "15px", lineHeight: "23.25px",
  color: "rgb(27,21,35)", whiteSpace: "pre-line", textWrap: "pretty"
};

const FALLBACK = "Boa pergunta. Cruzando performance, feedbacks e pesquisas de experiência dessa área, encontrei 3 pontos de atenção e 2 oportunidades. Vamos seguir por uma das opções abaixo?";

// A small branching script for the Boreal demo: each node is a bot line plus
// the buttons that lead to the next node, so the visitor drives the
// conversation instead of watching a single fixed exchange play out.
const CHAT_TREE = {
  start: {
    bot: "Oi! Sou o Boreal, a IA de RH da Aurora. Como posso te ajudar hoje? Escolha uma opção ou digite sua pergunta.",
    options: [
      { label: "Avaliar colaboradores", next: "employees" },
      { label: "Avaliar uma possível demissão", next: "demissao" },
      { label: "Entender queda de performance", next: "performance" },
      { label: "Comparar planos e preços", next: "planos" },
      { label: "Tirar dúvidas sobre a Aurora", next: "duvidas" }
    ]
  },
  duvidas: {
    bot: "Claro! Sobre o que você quer saber?",
    options: [
      { label: "Como funciona a implantação?", next: "duvidasImplantacao" },
      { label: "Integra com meu RH atual?", next: "duvidasIntegracao" },
      { label: "É seguro para dados sensíveis?", next: "duvidasSeguranca" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  duvidasImplantacao: {
    bot: "A implantação da Aurora leva em média 2 semanas: a 1ª semana é para importar dados e configurar times, a 2ª para treinar a liderança e ativar o Boreal. Nenhuma etapa exige pausar as operações de RH.",
    options: [
      { label: "Voltar às dúvidas", next: "duvidas" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  duvidasIntegracao: {
    bot: "Sim — a Aurora se integra com os principais sistemas de RH e folha de pagamento via API, além de importação por planilha para quem prefere migrar em etapas.",
    options: [
      { label: "Voltar às dúvidas", next: "duvidas" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  duvidasSeguranca: {
    bot: "Sim. Os dados ficam criptografados em trânsito e em repouso, com controle de acesso por papel (quem vê o quê) e conformidade com a LGPD.",
    options: [
      { label: "Voltar às dúvidas", next: "duvidas" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  demissao: {
    bot: "Antes de seguir com a demissão da Maria da Silva, vale considerar alguns dados:\n📊 Desempenho: queda de 18% nos últimos 3 meses, mas 92% das entregas anteriores estavam dentro do prazo.\n💰 Custo estimado do desligamento: R$ 18.500, considerando rescisão, encargos e custos de substituição.\n📈 Colaboradores em situações semelhantes tiveram aumento médio de 25% na produtividade após um plano de desenvolvimento de 90 dias.\nComo você quer seguir?",
    options: [
      { label: "Estruturar Plano de Desenvolvimento", next: "plano90" },
      { label: "Calcular custos de demissão", next: "custos" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  plano90: {
    bot: "Plano de Desenvolvimento — Maria da Silva (90 dias)\n• Dias 1-30: alinhamento de expectativas, 2 metas de entrega e 1 checkpoint quinzenal.\n• Dias 31-60: mentoria com par sênior + revisão de indicadores de qualidade.\n• Dias 61-90: avaliação final de performance e decisão documentada.\nPosso lançar esse plano no ciclo de performance atual?",
    options: [
      { label: "Sim, lançar no ciclo atual", next: "lancar" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  custos: {
    bot: "Custo estimado do desligamento da Maria: R$ 18.500\n• Rescisão e verbas: R$ 9.200\n• Encargos e multa de FGTS: R$ 3.100\n• Recrutamento e seleção: R$ 2.900\n• Ramp-up do substituto (3 meses): R$ 3.300\nComparado a R$ 4.800 de um plano de desenvolvimento de 90 dias — quer ver o plano?",
    options: [
      { label: "Estruturar Plano de Desenvolvimento", next: "plano90" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  lancar: {
    bot: "Prontinho — adicionei o Plano de Desenvolvimento da Maria ao ciclo atual, com checkpoints quinzenais. Quer que eu avise a liderança dela agora?",
    options: [
      { label: "Sim, avisar a liderança", next: "avisar" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  avisar: {
    bot: "Notificação enviada à liderança da Maria, com o plano e os prazos anexados. Posso ajudar com outra decisão?",
    options: [
      { label: "Voltar ao início", next: "start" }
    ]
  },
  performance: {
    bot: "Analisando os últimos 90 dias do time: queda média de 12% na entrega, mas a satisfação no trabalho subiu 8%. Isso costuma indicar sobrecarga, não falta de engajamento. Como você quer investigar?",
    options: [
      { label: "Ver por colaborador", next: "porColaborador" },
      { label: "Ver causa raiz", next: "causaRaiz" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  porColaborador: {
    bot: "3 colaboradores concentram 70% da queda — todos com mais de 6 projetos simultâneos no período. Os outros 9 do time mantiveram a média histórica. Quer que eu monte um plano de redistribuição de carga?",
    options: [
      { label: "Voltar ao início", next: "start" }
    ]
  },
  causaRaiz: {
    bot: "Cruzando com a pesquisa de experiência: sobrecarga (61%) e falta de clareza de prioridades (24%) são as causas mais citadas. Menos de 5% aponta para falta de engajamento. Quer priorizar um plano de ação sobre isso?",
    options: [
      { label: "Voltar ao início", next: "start" }
    ]
  },
  planos: {
    bot: "Nossos planos: Básico (R$ 30/colaborador) cobre o essencial de gestão. Boreal (R$ 49,99/colaborador) adiciona inteligência artificial e planos de ação individuais. Quer que eu simule o custo total para o seu time?",
    options: [
      { label: "Simular para 50 pessoas", next: "simular50" },
      { label: "Simular para 200 pessoas", next: "simular200" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  simular50: {
    bot: "Para 50 colaboradores:\n• Básico: R$ 1.500/mês\n• Boreal: R$ 2.499,50/mês\nA diferença (≈R$ 1.000/mês) costuma se pagar com uma única decisão de retenção evitada. Quer falar com o time comercial?",
    options: [
      { label: "Falar com o time comercial", next: "comercial" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  simular200: {
    bot: "Para 200 colaboradores:\n• Básico: R$ 6.000/mês\n• Boreal: R$ 9.998/mês\nEmpresas nesse porte costumam recuperar a diferença já no primeiro trimestre com menos turnover. Quer falar com o time comercial?",
    options: [
      { label: "Falar com o time comercial", next: "comercial" },
      { label: "Voltar ao início", next: "start" }
    ]
  },
  comercial: {
    bot: "Perfeito — deixe seus dados no formulário de contato abaixo que a nossa equipe entra em contato em até 1 dia útil.",
    options: [
      { label: "Voltar ao início", next: "start" }
    ]
  }
};

// The employee roster behind "Avaliar colaboradores" — grouped by
// departamento in the list, each entry expands into its own profile +
// action nodes below (built by buildEmployeeNodes, not typed out by hand).
const EMPLOYEES = [
  {
    slug: "rafael-tanaka", nome: "Rafael Tanaka", cargo: "Engenheiro de Software Sênior", departamento: "Engenharia",
    senioridade: "Sênior", tempoEmpresa: "3 anos e 4 meses", performance: "Acima da média nos últimos 2 ciclos",
    salario: 14200, highlight: "Liderou a migração de infraestrutura, reduzindo custos em 22%.",
    lowlight: "Atrasos em revisões de código no último trimestre.",
    projPassado: "Migração para AWS", projAtual: "Plataforma de Analytics v2", projFuturo: "Automação de deploys",
    proximoNivel: "Engenheiro Principal", custoDesligamento: 21400
  },
  {
    slug: "beatriz-nogueira", nome: "Beatriz Nogueira", cargo: "Engenheira de Software Pleno", departamento: "Engenharia",
    senioridade: "Pleno", tempoEmpresa: "1 ano e 8 meses", performance: "Consistente, dentro da média do time",
    salario: 9800, highlight: "Reduziu bugs em produção em 30% no último ciclo.",
    lowlight: "Pouca participação em decisões de arquitetura.",
    projPassado: "App mobile", projAtual: "Plataforma de Analytics v2", projFuturo: "Onboarding automatizado",
    proximoNivel: "Engenheira de Software Sênior", custoDesligamento: 15600
  },
  {
    slug: "diego-ferraz", nome: "Diego Ferraz", cargo: "Executivo de Vendas Sênior", departamento: "Vendas",
    senioridade: "Sênior", tempoEmpresa: "4 anos", performance: "Bateu 118% da meta no último trimestre",
    salario: 12500, highlight: "Fechou o maior contrato do ano (R$ 480.000).",
    lowlight: "Alta rotatividade na carteira de clientes pequenos.",
    projPassado: "Expansão para a região Sul", projAtual: "Contas Enterprise", projFuturo: "Programa de parcerias",
    proximoNivel: "Gerente de Contas Enterprise", custoDesligamento: 19800
  },
  {
    slug: "juliana-prado", nome: "Juliana Prado", cargo: "SDR Júnior", departamento: "Vendas",
    senioridade: "Júnior", tempoEmpresa: "7 meses", performance: "Acima da meta de qualificação de leads",
    salario: 4200, highlight: "Melhor taxa de conversão de leads do time.",
    lowlight: "Ainda em curva de aprendizado em negociação.",
    projPassado: "—", projAtual: "Prospecção outbound", projFuturo: "Transição para Executiva de Vendas",
    proximoNivel: "SDR Pleno", custoDesligamento: 6100
  },
  {
    slug: "camila-duarte", nome: "Camila Duarte", cargo: "Analista de Marketing Pleno", departamento: "Marketing",
    senioridade: "Pleno", tempoEmpresa: "2 anos e 2 meses", performance: "Dentro da média do time",
    salario: 7600, highlight: "A campanha de lançamento gerou +40% de leads.",
    lowlight: "Atraso na entrega de materiais em 2 campanhas.",
    projPassado: "Rebranding", projAtual: "Campanha do 3º trimestre", projFuturo: "Série de webinars",
    proximoNivel: "Analista de Marketing Sênior", custoDesligamento: 11900
  },
  {
    slug: "pedro-ximenes", nome: "Pedro Ximenes", cargo: "Coordenador de Marketing Sênior", departamento: "Marketing",
    senioridade: "Sênior", tempoEmpresa: "5 anos", performance: "Alta, com destaque na liderança do time",
    salario: 13400, highlight: "Estruturou o time de conteúdo do zero.",
    lowlight: "Sobrecarga relatada na última pesquisa de experiência.",
    projPassado: "Estruturação do time de conteúdo", projAtual: "Estratégia de conteúdo 2026", projFuturo: "Expansão internacional",
    proximoNivel: "Gerente de Marketing", custoDesligamento: 20900
  },
  {
    slug: "fernanda-lopes", nome: "Fernanda Lopes", cargo: "Analista de RH Júnior", departamento: "RH",
    senioridade: "Júnior", tempoEmpresa: "10 meses", performance: "Em desenvolvimento, evolução consistente",
    salario: 5200, highlight: "Implementou a pesquisa de clima automatizada.",
    lowlight: "Ainda com pouca autonomia em processos de desligamento.",
    projPassado: "—", projAtual: "Pesquisa de clima automatizada", projFuturo: "Onboarding digital",
    proximoNivel: "Analista de RH Pleno", custoDesligamento: 7400
  },
  {
    slug: "maria-da-silva", nome: "Maria da Silva", cargo: "Analista de Operações Pleno", departamento: "RH",
    senioridade: "Pleno", tempoEmpresa: "2 anos", performance: "Queda de 18% nos últimos 3 meses, mas 92% das entregas no prazo",
    salario: 8400, highlight: "Historicamente uma das melhores entregadoras do time.",
    lowlight: "Queda recente de produtividade, com indícios de sobrecarga.",
    projPassado: "Implantação do módulo de pesquisas", projAtual: "Suporte ao ciclo de performance atual", projFuturo: "A definir, pendente da decisão sobre seu caso",
    proximoNivel: "Analista de Operações Sênior", custoDesligamento: 18500
  }
];

function fmtMoney(n) {
  return "R$ " + n.toLocaleString("pt-BR");
}

function employeeProfileText(e) {
  return "👤 " + e.nome + " — " + e.cargo + " (" + e.departamento + ")\n" +
    "🎯 Senioridade: " + e.senioridade + "\n" +
    "🕒 Tempo na empresa: " + e.tempoEmpresa + "\n" +
    "📊 Performance: " + e.performance + "\n" +
    "💰 Salário: " + fmtMoney(e.salario) + "/mês\n" +
    "✅ Highlight: " + e.highlight + "\n" +
    "⚠️ Lowlight: " + e.lowlight + "\n" +
    "📁 Projetos: " + e.projPassado + " (passado) → " + e.projAtual + " (atual) → " + e.projFuturo + " (futuro)\n\n" +
    "Como você quer agir?";
}

// Each employee expands into a profile node plus its own promote/adjust
// pay/development-plan/dismiss sub-nodes, generated here instead of typed
// out by hand for all 8 people.
function buildEmployeeNodes(e) {
  const key = "emp:" + e.slug;
  const novoSalario = Math.round(e.salario * 1.1 / 100) * 100;
  const nodes = {};

  nodes[key] = {
    bot: employeeProfileText(e),
    options: [
      { label: "Promover", next: key + ":promover" },
      { label: "Ajustar remuneração", next: key + ":salario" },
      { label: "Plano de desenvolvimento", next: key + ":plano" },
      { label: "Demitir", next: key + ":demitir" },
      { label: "Voltar para a lista", next: "employees" }
    ]
  };

  nodes[key + ":promover"] = {
    bot: "Com base no histórico de " + e.nome + ", sugiro promover para " + e.proximoNivel + ", com reajuste de 15% a 20%. Quer que eu prepare a proposta para a liderança?",
    options: [
      { label: "Preparar proposta", next: key + ":promover:ok" },
      { label: "Voltar para a lista", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };
  nodes[key + ":promover:ok"] = {
    bot: "Proposta de promoção de " + e.nome + " para " + e.proximoNivel + " enviada para aprovação da liderança, com justificativa baseada em performance e nos highlights recentes.",
    options: [
      { label: "Avaliar outro colaborador", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };

  nodes[key + ":salario"] = {
    bot: "Comparando com a média de mercado para " + e.cargo + ", uma correção de ~10% deixaria " + e.nome.split(" ")[0] + " melhor posicionado(a): de " + fmtMoney(e.salario) + " para " + fmtMoney(novoSalario) + "/mês. Quer aplicar o ajuste?",
    options: [
      { label: "Aplicar ajuste", next: key + ":salario:ok" },
      { label: "Voltar para a lista", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };
  nodes[key + ":salario:ok"] = {
    bot: "Ajuste salarial de " + e.nome + " para " + fmtMoney(novoSalario) + "/mês enviado para aprovação do financeiro.",
    options: [
      { label: "Avaliar outro colaborador", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };

  nodes[key + ":plano"] = {
    bot: "Plano de Desenvolvimento sugerido para " + e.nome + " (90 dias):\n• Dias 1-30: alinhamento de expectativas e metas claras com a liderança.\n• Dias 31-60: mentoria com par sênior e revisão quinzenal de indicadores.\n• Dias 61-90: avaliação final de performance e decisão documentada.\nPosso lançar esse plano no ciclo atual?",
    options: [
      { label: "Lançar plano", next: key + ":plano:ok" },
      { label: "Voltar para a lista", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };
  nodes[key + ":plano:ok"] = {
    bot: "Plano de Desenvolvimento de " + e.nome + " lançado no ciclo atual, com checkpoints quinzenais.",
    options: [
      { label: "Avaliar outro colaborador", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };

  nodes[key + ":demitir"] = {
    bot: "Antes de decidir pelo desligamento de " + e.nome + ", vale considerar:\n💰 Custo estimado: " + fmtMoney(e.custoDesligamento) + ", considerando rescisão, encargos e substituição.\n📈 Colaboradores em situações parecidas costumam se recuperar em até 90 dias com um plano estruturado.\nQuer ver alternativas antes de decidir?",
    options: [
      { label: "Ver plano de desenvolvimento", next: key + ":plano" },
      { label: "Confirmar desligamento", next: key + ":demitir:ok" },
      { label: "Voltar para a lista", next: "employees" }
    ]
  };
  nodes[key + ":demitir:ok"] = {
    bot: "Desligamento de " + e.nome + " registrado, com processo de offboarding iniciado.",
    options: [
      { label: "Avaliar outro colaborador", next: "employees" },
      { label: "Voltar ao início", next: "start" }
    ]
  };

  return nodes;
}

const DEPARTAMENTOS = ["Engenharia", "Vendas", "Marketing", "RH"];

CHAT_TREE.employees = {
  bot: "Aqui está o time, organizado por setor e senioridade. Selecione um colaborador para ver o resumo completo.",
  groups: DEPARTAMENTOS.map(dep => ({
    label: dep,
    options: EMPLOYEES
      .filter(e => e.departamento === dep)
      .map(e => ({ label: e.nome + " — " + e.cargo + " (" + e.senioridade + ")", next: "emp:" + e.slug }))
  })),
  options: [
    { label: "Voltar ao início", next: "start" }
  ]
};

EMPLOYEES.forEach(e => Object.assign(CHAT_TREE, buildEmployeeNodes(e)));

/* ---------------- Icons ---------------- */

function buildIcon(def, color, fills) {
  if (!def) return null;
  const [minX, minY, vw, vh] = def.viewBox.split(/\s+/).map(Number);
  let body = def.body;
  if (fills) {
    let i = 0;
    body = body.replace(/fill="currentColor"/g, () => 'fill="' + (fills[i++] || fills[fills.length - 1]) + '"');
  }
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", String(vw + 2 * minX));
  svg.setAttribute("height", String(vh + 2 * minY));
  svg.setAttribute("viewBox", def.viewBox);
  svg.setAttribute("fill", "currentColor");
  svg.style.display = "block";
  svg.style.margin = minX + "px";
  svg.style.color = color;
  svg.style.flexShrink = "0";
  svg.style.overflow = "visible";
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML = body;
  return svg;
}

function mountIcons(icons) {
  document.querySelectorAll("[data-icon]").forEach(el => {
    const name = el.getAttribute("data-icon");
    const color = el.getAttribute("data-icon-color") || "currentColor";
    const fillsAttr = el.getAttribute("data-icon-fills");
    const fills = fillsAttr ? fillsAttr.split(",") : null;
    const svg = buildIcon(icons[name], color, fills);
    if (svg) el.appendChild(svg);
  });
}

/* ---------------- Scroll reveal ---------------- */

function initScrollReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  if (!("IntersectionObserver" in window)) {
    els.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  els.forEach(el => io.observe(el));
}

/* ---------------- Header scroll shadow ---------------- */

function initHeaderScrollShadow() {
  const header = document.querySelector(".header");
  if (!header) return;
  let ticking = false;
  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update();
}

function initNavScrollSpy() {
  const links = Array.from(document.querySelectorAll('.header-nav [data-nav]'));
  const sections = links
    .map(link => ({ link, section: document.getElementById((link.getAttribute("href") || "").slice(1)) }))
    .filter(entry => entry.section);
  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const match = sections.find(s => s.section === entry.target);
      if (!match) return;
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove("is-active"));
        match.link.classList.add("is-active");
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

  sections.forEach(({ section }) => observer.observe(section));
}

/* ---------------- Nav / header offset scroll ---------------- */

function initNav() {
  document.querySelectorAll("[data-nav]").forEach(el => {
    el.addEventListener("click", e => {
      const id = (el.getAttribute("href") || "").slice(1);
      const target = id && document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const hdr = document.querySelector('[data-r="hdr"]');
      const off = hdr ? hdr.getBoundingClientRect().height + 8 : 106;
      window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - off), behavior: "smooth" });
    });
  });
}

/* ---------------- Responsive scale (1280–1920px) ---------------- */

function initFit() {
  const root = document.getElementById("root");
  if (!root) return;
  // `zoom` reflows the layout for real (unlike `transform: scale`, which only
  // repaints it visually and needs a negative-margin hack to avoid leaving
  // blank space below). That transform + overflow:hidden + border-radius
  // combo on the plan cards was clipping their background mid-card in
  // Chromium, so `zoom` sidesteps the compositing bug entirely.
  // No upper bound: on screens wider than the 1920 design canvas the page
  // scales UP to fill the viewport instead of staying capped with blank
  // margins on the sides — same mechanism, just no ceiling on it.
  function fit() {
    const w = window.innerWidth;
    root.style.zoom = w >= 1280 ? String(w / 1920) : "";
  }
  fit();
  window.addEventListener("resize", fit);
  setInterval(fit, 1200);
}

/* ---------------- Video modal ---------------- */

function initVideoModal() {
  const modal = document.getElementById("video-modal");
  const closeBtn = modal ? modal.querySelector(".js-close-video") : null;
  const pageRoot = document.getElementById("root");
  if (!modal || !closeBtn) return;

  let lastFocused = null;

  function focusableEls() {
    return [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
      .filter(el => !el.disabled && el.offsetParent !== null);
  }

  function onKeydown(e) {
    if (e.key === "Escape") { close(); return; }
    if (e.key === "Tab") {
      const els = focusableEls();
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function open(e) {
    lastFocused = (e && e.currentTarget) || document.activeElement;
    modal.classList.remove("hidden");
    if (pageRoot) pageRoot.setAttribute("inert", "");
    document.addEventListener("keydown", onKeydown);
    closeBtn.focus();
  }

  function close() {
    modal.classList.add("hidden");
    if (pageRoot) pageRoot.removeAttribute("inert");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  document.querySelectorAll(".js-open-video").forEach(b => b.addEventListener("click", open));
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
}

/* ---------------- Pricing plan toggle ---------------- */

function initPlanToggle() {
  const btnMensal = document.getElementById("tab-mensal");
  const btnAnual = document.getElementById("tab-anual");
  const priceBasic = document.getElementById("price-basic");
  const priceBoreal = document.getElementById("price-boreal");
  const pricePeriods = document.querySelectorAll(".price-period");
  if (!btnMensal || !btnAnual) return;

  function render(anual) {
    btnMensal.style.background = anual ? "transparent" : "rgb(255,255,255)";
    btnMensal.style.fontWeight = anual ? "400" : "500";
    btnMensal.style.color = anual ? "rgb(255,255,255)" : "rgb(52,64,84)";
    btnMensal.setAttribute("aria-pressed", anual ? "false" : "true");
    btnAnual.style.background = anual ? "rgb(255,255,255)" : "transparent";
    btnAnual.style.color = anual ? "rgb(23,15,73)" : "rgb(255,255,255)";
    btnAnual.setAttribute("aria-pressed", anual ? "true" : "false");
    priceBasic.textContent = anual ? "R$ 27,50" : "R$ 30,00";
    priceBoreal.textContent = anual ? "R$ 45,82" : "R$ 49,99";
    pricePeriods.forEach(p => { p.textContent = anual ? "/por mês, no anual" : "/por mês"; });
  }

  btnMensal.addEventListener("click", () => render(false));
  btnAnual.addEventListener("click", () => render(true));
  render(false);
}

/* ---------------- Chat (Boreal) ---------------- */

function initChat() {
  const body = document.getElementById("chat-body");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const sendBtn = form ? form.querySelector(".chat-send-btn") : null;
  const typingIndicator = document.getElementById("typing-indicator");
  const startOverlay = document.getElementById("chat-start-overlay");
  const startBtn = document.getElementById("chat-start-btn");
  if (!body || !form || !input) return;

  let replyTimer = null;
  let extraEls = [];

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  function applyStyle(el, styleObj) {
    Object.assign(el.style, styleObj);
  }

  function push(role, text) {
    const wrap = document.createElement("div");
    applyStyle(wrap, { display: "flex", justifyContent: role === "bot" ? "flex-start" : "flex-end", alignSelf: "stretch", animation: "auroraFadeIn .28s ease" });
    const bubble = document.createElement("div");
    applyStyle(bubble, role === "bot" ? BOT_BUBBLE : USER_BUBBLE);
    bubble.textContent = text;
    wrap.appendChild(bubble);
    typingIndicator.insertAdjacentElement("beforebegin", wrap);
    scrollToBottom();
  }

  function clearOptions() {
    extraEls.forEach(el => el.remove());
    extraEls = [];
  }

  function addExtra(el) {
    typingIndicator.insertAdjacentElement("beforebegin", el);
    extraEls.push(el);
  }

  function renderOptions(options) {
    if (!options || !options.length) return;
    const el = document.createElement("div");
    el.className = "chat-quick-replies";
    options.forEach(opt => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "quick-reply chat-quick-reply-btn";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => goToNode(opt.label, opt.next));
      el.appendChild(btn);
    });
    addExtra(el);
  }

  // A node with `groups` (like the employee roster) renders one department
  // label + its own button row per group, then falls through to the node's
  // regular `options` (e.g. "Voltar ao início") below all of them.
  function renderGroups(groups) {
    groups.forEach(group => {
      if (!group.options || !group.options.length) return;
      const label = document.createElement("span");
      label.className = "chat-dept-label";
      label.textContent = group.label;
      addExtra(label);
      renderOptions(group.options);
    });
  }

  function showNode(nodeKey) {
    const node = CHAT_TREE[nodeKey];
    if (!node) return;
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
    clearTimeout(replyTimer);
    replyTimer = setTimeout(() => {
      typingIndicator.classList.add("hidden");
      push("bot", node.bot);
      if (node.groups) renderGroups(node.groups);
      renderOptions(node.options);
      scrollToBottom();
    }, 700);
  }

  function goToNode(label, nextKey) {
    clearOptions();
    push("user", label);
    showNode(nextKey);
  }

  function ask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    clearOptions();
    push("user", trimmed);
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
    clearTimeout(replyTimer);
    replyTimer = setTimeout(() => {
      typingIndicator.classList.add("hidden");
      push("bot", FALLBACK);
      renderOptions(CHAT_TREE.start.options);
    }, 900);
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = input.value;
    input.value = "";
    ask(v);
  });

  // The conversation only starts once the visitor clicks "Iniciar
  // simulação" — until then the input stays disabled so there's nothing
  // to reply to yet.
  input.disabled = true;
  if (sendBtn) sendBtn.disabled = true;

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (startOverlay) startOverlay.remove();
      input.disabled = false;
      if (sendBtn) sendBtn.disabled = false;
      input.focus();
      showNode("start");
    }, { once: true });
  } else {
    // No start button in the DOM (unexpected) — fall back to auto-starting
    // so the chat still works instead of staying dead.
    showNode("start");
  }
}

/* ---------------- Calendar ---------------- */

const calState = { monthOffset: 0, selDate: "", selTime: "" };

function renderCalendar() {
  const monthLabel = document.getElementById("cal-month");
  const daysGrid = document.getElementById("cal-days");
  const slotsGrid = document.getElementById("cal-slots");
  const summary = document.getElementById("cal-summary");
  const prevBtn = document.getElementById("cal-prev");
  if (!monthLabel || !daysGrid || !slotsGrid) return;

  const MONTHS = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const base = new Date(today.getFullYear(), today.getMonth() + calState.monthOffset, 1);
  const first = base.getDay();
  const total = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();

  monthLabel.textContent = MONTHS[base.getMonth()].charAt(0).toUpperCase() + MONTHS[base.getMonth()].slice(1) + " de " + base.getFullYear();

  const canBack = calState.monthOffset > 0;
  prevBtn.disabled = !canBack;
  prevBtn.style.cursor = canBack ? "pointer" : "default";
  prevBtn.style.opacity = canBack ? "1" : ".4";

  // Rebuilding the buttons below drops keyboard focus, so remember what kind
  // of control had it and restore focus to its replacement afterwards.
  const active = document.activeElement;
  const refocus = {
    day: active && active.classList && active.classList.contains("cal-day") ? active.dataset.date : null,
    slot: active && active.classList && active.classList.contains("cal-slot") ? active.dataset.time : null
  };

  daysGrid.innerHTML = "";
  for (let i = 0; i < first; i++) {
    const span = document.createElement("span");
    span.style.height = "32px";
    span.style.visibility = "hidden";
    span.setAttribute("aria-hidden", "true");
    daysGrid.appendChild(span);
  }
  let dayToFocus = null;
  for (let d = 1; d <= total; d++) {
    const date = new Date(base.getFullYear(), base.getMonth(), d);
    const iso = base.getFullYear() + "-" + String(base.getMonth() + 1).padStart(2, "0") + "-" + String(d).padStart(2, "0");
    const weekend = date.getDay() === 0 || date.getDay() === 6;
    const past = date < today;
    const off = weekend || past;
    const on = calState.selDate === iso;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cal-day";
    btn.textContent = String(d);
    btn.disabled = off;
    btn.dataset.date = iso;
    btn.setAttribute("role", "gridcell");
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.setAttribute("aria-label", String(d) + " de " + MONTHS[base.getMonth()] + " de " + base.getFullYear() + (off ? (weekend ? " (fim de semana, indisponível)" : " (data passada, indisponível)") : ""));
    Object.assign(btn.style, {
      height: "32px", borderRadius: "8px", border: "1px solid " + (on ? "rgb(226,61,116)" : "transparent"),
      background: on ? "rgb(226,61,116)" : "transparent",
      fontFamily: "Montserrat, sans-serif", fontSize: "13px", fontWeight: "500", lineHeight: "1",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background .15s ease, color .15s ease",
      cursor: off ? "default" : "pointer",
      color: on ? "rgb(255,255,255)" : off ? "rgb(200,196,206)" : "rgb(36,27,58)"
    });
    if (!off) {
      btn.addEventListener("click", () => {
        calState.selDate = iso; calState.selTime = "";
        setFormMessage("", false);
        renderCalendar();
      });
    }
    if (refocus.day === iso) dayToFocus = btn;
    daysGrid.appendChild(btn);
  }

  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
  slotsGrid.innerHTML = "";
  let slotToFocus = null;
  times.forEach(t => {
    const on = calState.selTime === t;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cal-slot";
    btn.textContent = t;
    btn.disabled = !calState.selDate;
    btn.dataset.time = t;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    Object.assign(btn.style, {
      height: "32px", borderRadius: "999px", border: "1px solid " + (on ? "rgb(105,80,157)" : "rgb(231,222,233)"),
      background: on ? "rgb(105,80,157)" : "rgb(255,255,255)",
      fontFamily: "Montserrat, sans-serif", fontSize: "13px", fontWeight: "500",
      cursor: calState.selDate ? "pointer" : "default",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background .15s ease, color .15s ease",
      color: on ? "rgb(255,255,255)" : "rgb(36,27,58)"
    });
    btn.addEventListener("click", () => {
      calState.selTime = t;
      setFormMessage("", false);
      renderCalendar();
    });
    if (refocus.slot === t) slotToFocus = btn;
    slotsGrid.appendChild(btn);
  });

  if (dayToFocus) dayToFocus.focus();
  else if (slotToFocus) slotToFocus.focus();

  summary.textContent = calState.selDate && calState.selTime
    ? "Reunião de 30 min em " + calState.selDate.split("-").reverse().join("/") + " às " + calState.selTime + " — adicionamos ao seu Google Agenda ao enviar."
    : "Escolha um dia e um horário disponível (seg–sex, horário de Brasília).";
}

function initCalendar() {
  const prevBtn = document.getElementById("cal-prev");
  const nextBtn = document.getElementById("cal-next");
  if (!prevBtn || !nextBtn) return;
  prevBtn.addEventListener("click", () => {
    if (calState.monthOffset > 0) {
      calState.monthOffset -= 1; calState.selDate = ""; calState.selTime = "";
      renderCalendar();
    }
  });
  nextBtn.addEventListener("click", () => {
    calState.monthOffset += 1; calState.selDate = ""; calState.selTime = "";
    renderCalendar();
  });
  renderCalendar();
}

/* ---------------- Multi-step contact form ---------------- */

const STEPS = [
  { n: 1, label: "Seus dados" },
  { n: 2, label: "Contato" },
  { n: 3, label: "Sua operação" },
  { n: 4, label: "Agenda" }
];
let currentStep = 1;

function setFormMessage(text, ok) {
  const msg = document.getElementById("form-msg");
  if (!msg) return;
  msg.textContent = text;
  msg.style.color = ok ? "rgb(181,239,214)" : "rgb(245,168,200)";
}

function renderSteps() {
  STEPS.forEach(s => {
    const badge = document.getElementById("step-badge-" + s.n);
    const label = document.getElementById("step-label-" + s.n);
    const item = document.getElementById("step-item-" + s.n);
    const done = s.n < currentStep;
    const on = s.n === currentStep;
    badge.textContent = done ? "✓" : String(s.n);
    Object.assign(badge.style, {
      border: "1px solid " + (on || done ? "transparent" : "rgba(255,255,255,0.28)"),
      background: on ? "rgb(226,61,116)" : done ? "rgba(181,239,214,0.9)" : "transparent",
      color: on ? "rgb(255,255,255)" : done ? "rgb(8,124,116)" : "rgba(255,255,255,0.6)"
    });
    label.style.fontWeight = on ? "700" : "400";
    label.style.color = on ? "rgb(255,255,255)" : "rgba(255,255,255,0.56)";
    item.style.cursor = s.n < currentStep ? "pointer" : "default";
    if (on) item.setAttribute("aria-current", "step");
    else item.removeAttribute("aria-current");
    item.setAttribute("aria-disabled", s.n < currentStep ? "false" : "true");
  });

  for (let n = 1; n <= 4; n++) {
    document.getElementById("form-step-" + n).classList.toggle("hidden", n !== currentStep);
  }
  document.getElementById("btn-back").classList.toggle("hidden", currentStep <= 1);
  document.getElementById("btn-next").classList.toggle("hidden", currentStep >= 4);
  document.getElementById("btn-submit").classList.toggle("hidden", currentStep !== 4);
}

function getFormValues() {
  return {
    nome: document.getElementById("f-nome").value,
    empresa: document.getElementById("f-empresa").value,
    email: document.getElementById("f-email").value,
    telefone: document.getElementById("f-telefone").value,
    colaboradores: document.getElementById("f-colaboradores").value,
    mensagem: document.getElementById("f-mensagem").value
  };
}

function stepGaps(step) {
  const f = getFormValues();
  const miss = [];
  if (step === 1) {
    if (!f.nome.trim()) miss.push("nome");
    if (!f.empresa.trim()) miss.push("empresa");
  } else if (step === 2) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) miss.push("e-mail válido");
  } else if (step === 3) {
    if (!f.colaboradores) miss.push("quantidade de colaboradores");
  } else if (step === 4) {
    if (!calState.selDate || !calState.selTime) miss.push("dia e horário da reunião");
  }
  return miss;
}

function gcalUrl(f) {
  const [y, m, d] = calState.selDate.split("-").map(Number);
  const [hh, mm] = calState.selTime.split(":").map(Number);
  const pad = n => String(n).padStart(2, "0");
  const stamp = (h, mi) => `${y}${pad(m)}${pad(d)}T${pad(h)}${pad(mi)}00`;
  const endM = mm + 30;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: "Aurora × " + (f.empresa.trim() || f.nome.trim()) + " — demonstração",
    dates: stamp(hh, mm) + "/" + stamp(hh + Math.floor(endM / 60), endM % 60),
    details: "Demonstração da Aurora (RH as a Service).\nContato: " + f.nome.trim() + " — " + f.email.trim() + (f.telefone.trim() ? " — " + f.telefone.trim() : "") + "\nColaboradores: " + f.colaboradores + (f.mensagem.trim() ? "\n\n" + f.mensagem.trim() : ""),
    location: "Google Meet",
    add: "contato@usearora.com.br"
  });
  return "https://calendar.google.com/calendar/render?" + params.toString();
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  STEPS.forEach(s => {
    document.getElementById("step-item-" + s.n).addEventListener("click", () => {
      if (s.n < currentStep) { currentStep = s.n; setFormMessage("", false); renderSteps(); }
    });
  });

  document.getElementById("btn-back").addEventListener("click", () => {
    currentStep = Math.max(1, currentStep - 1);
    setFormMessage("", false);
    renderSteps();
  });

  document.getElementById("btn-next").addEventListener("click", () => {
    const miss = stepGaps(currentStep);
    if (miss.length) setFormMessage("Preencha: " + miss.join(", ") + ".", false);
    else { currentStep += 1; setFormMessage("", false); renderSteps(); }
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const f = getFormValues();
    const missing = [];
    if (!f.nome.trim()) missing.push("nome");
    if (!f.empresa.trim()) missing.push("empresa");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) missing.push("e-mail válido");
    if (!f.colaboradores) missing.push("quantidade de colaboradores");
    if (!calState.selDate || !calState.selTime) missing.push("dia e horário da reunião");

    if (missing.length) {
      setFormMessage("Preencha: " + missing.join(", ") + ".", false);
      return;
    }

    const url = gcalUrl(f);
    const when = calState.selDate.split("-").reverse().join("/") + " às " + calState.selTime;
    window.open(url, "_blank", "noopener");
    setFormMessage("Obrigado, " + f.nome.trim().split(" ")[0] + "! Sua reunião de " + when + " foi aberta no Google Agenda para confirmação.", true);
    form.reset();
    calState.selDate = ""; calState.selTime = "";
    currentStep = 1;
    renderCalendar();
    renderSteps();
  });

  renderSteps();
}

/* ---------------- Init ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initNavScrollSpy();
  initFit();
  initScrollReveal();
  initHeaderScrollShadow();
  initVideoModal();
  initPlanToggle();
  initChat();
  initCalendar();
  initContactForm();

  import("./icons.js").then(m => mountIcons(m.default)).catch(err => console.error("Falha ao carregar icons.js", err));
});
