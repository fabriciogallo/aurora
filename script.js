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

const REPLIES = {
  "Estruturar Plano de Desenvolvimento": "Plano de Desenvolvimento — Maria da Silva (90 dias)\n• Dias 1-30: alinhamento de expectativas, 2 metas de entrega e 1 checkpoint quinzenal.\n• Dias 31-60: mentoria com par sênior + revisão de indicadores de qualidade.\n• Dias 61-90: avaliação final de performance e decisão documentada.\nPosso lançar esse plano no ciclo de performance atual?",
  "Calcular custos de demissão": "Custo estimado do desligamento da Maria: R$ 18.500\n• Rescisão e verbas: R$ 9.200\n• Encargos e multa de FGTS: R$ 3.100\n• Recrutamento e seleção: R$ 2.900\n• Ramp-up do substituto (3 meses): R$ 3.300\nComparado a R$ 4.800 de um plano de desenvolvimento de 90 dias."
};
const FALLBACK = "Boa pergunta. Cruzando performance, feedbacks e pesquisas de experiência dessa área, encontrei 3 pontos de atenção e 2 oportunidades. Quer que eu detalhe por colaborador ou por time?";

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
  function fit() {
    const w = window.innerWidth;
    if (w >= 1280 && w < 1920) {
      const s = w / 1920;
      root.style.transform = "scale(" + s + ")";
      root.style.transformOrigin = "top left";
      root.style.marginBottom = -(root.offsetHeight * (1 - s)) + "px";
    } else {
      root.style.transform = "";
      root.style.marginBottom = "";
    }
  }
  fit();
  window.addEventListener("resize", fit);
  setInterval(fit, 1200);
}

/* ---------------- Video modal ---------------- */

function initVideoModal() {
  const modal = document.getElementById("video-modal");
  if (!modal) return;
  const open = () => modal.classList.remove("hidden");
  const close = () => modal.classList.add("hidden");
  document.querySelectorAll(".js-open-video").forEach(b => b.addEventListener("click", open));
  document.querySelectorAll(".js-close-video").forEach(b => b.addEventListener("click", close));
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
    btnAnual.style.background = anual ? "rgb(255,255,255)" : "transparent";
    btnAnual.style.color = anual ? "rgb(23,15,73)" : "rgb(255,255,255)";
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
  const typingIndicator = document.getElementById("typing-indicator");
  if (!body || !form || !input) return;

  let replyTimer = null;

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

  function ask(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    push("user", trimmed);
    typingIndicator.classList.remove("hidden");
    scrollToBottom();
    clearTimeout(replyTimer);
    replyTimer = setTimeout(() => {
      typingIndicator.classList.add("hidden");
      push("bot", REPLIES[trimmed] || FALLBACK);
    }, 900);
  }

  document.querySelectorAll(".js-quick-reply").forEach(btn => {
    btn.addEventListener("click", () => ask(btn.getAttribute("data-reply")));
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = input.value;
    input.value = "";
    ask(v);
  });
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

  daysGrid.innerHTML = "";
  for (let i = 0; i < first; i++) {
    const span = document.createElement("span");
    span.style.height = "32px";
    span.style.visibility = "hidden";
    daysGrid.appendChild(span);
  }
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
    daysGrid.appendChild(btn);
  }

  const times = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];
  slotsGrid.innerHTML = "";
  times.forEach(t => {
    const on = calState.selTime === t;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cal-slot";
    btn.textContent = t;
    btn.disabled = !calState.selDate;
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
    slotsGrid.appendChild(btn);
  });

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
  initFit();
  initVideoModal();
  initPlanToggle();
  initChat();
  initCalendar();
  initContactForm();

  import("./icons.js").then(m => mountIcons(m.default)).catch(err => console.error("Falha ao carregar icons.js", err));
});
