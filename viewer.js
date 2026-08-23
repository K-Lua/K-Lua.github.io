const rowBorder = 'style="border-color: var(--t-line); border-bottom-width: var(--t-bw);"';

const playSvg = '<svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true"><path d="M2.5 1.3a.6.6 0 0 1 .9-.5l7 4.7a.6.6 0 0 1 0 1l-7 4.7a.6.6 0 0 1-.9-.5z"/></svg>';
const codeSvg = '<svg width="12" height="11" viewBox="0 0 14 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 2.5 1 6l3.5 3.5M9.5 2.5 13 6l-3.5 3.5"/></svg>';
const lockSvg = '<svg width="10" height="11" viewBox="0 0 12 13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><rect x="1.5" y="5.5" width="9" height="6" rx="1.5"/><path d="M3.5 5.5V4a2.5 2.5 0 0 1 5 0v1.5"/></svg>';
const imgSvg = '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="1.5" width="12" height="11" rx="1.5"/><circle cx="5" cy="5.5" r="1.2"/><path d="m1.5 11 3.5-3.5 2.5 2.5 2-2 3 3"/></svg>';
const prevSvg = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 2 4 7l5 5"/></svg>';
const nextSvg = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 2 5 5-5 5"/></svg>';

const mediaList = (p) => {
  const items = [];
  if (p.mp4) items.push({ type: "video", src: p.mp4 });
  else if (p.yt) items.push({ type: "yt", src: p.yt });
  (p.images || []).forEach((src) => items.push({ type: "image", src }));
  return items;
};
const hasVideo = (p) => Boolean(p.mp4 || p.yt);
const hasMedia = (p) => mediaList(p).length > 0;
const hasCode = (p) => Boolean(p.files && p.files.length);

const thumb = (p, i, extra = "") => {
  const act = hasMedia(p) ? "video" : hasCode(p) ? "code" : "";
  const img = p.img ? `<img src="${p.img}" alt="" loading="lazy">` : "";
  const badge = hasVideo(p) ? playSvg : hasMedia(p) ? imgSvg : codeSvg;
  const tag = hasVideo(p) ? "showcase" : hasMedia(p) ? "gallery" : act ? "source" : "preview";
  const inner = `${img}<span class="play-badge">${badge}</span><span class="thumb-tag">${tag}</span>`;
  if (!act) return `<div class="thumb thumb-still ${extra}" style="--tx:${i}">${inner}</div>`;
  const label = hasMedia(p) ? `Open ${p.name} showcase` : `View ${p.name} source`;
  return `<button class="thumb ${extra}" style="--tx:${i}" data-act="${act}" data-p="${i}" aria-label="${label}">${inner}</button>`;
};

const acts = (i) => {
  const p = DATA.projects[i];
  const b = [];
  if (hasMedia(p)) b.push(`<button class="act" data-act="video" data-p="${i}">${hasVideo(p) ? playSvg + " Watch" : imgSvg + " View"}</button>`);
  if (hasCode(p)) b.push(`<button class="act" data-act="code" data-p="${i}">${codeSvg} Code</button>`);
  return b.length ? `<div class="flex flex-wrap gap-2">${b.join("")}</div>` : "";
};

const LUA_KW = new Set(["local","function","end","if","then","else","elseif","for","while","repeat","until","do","return","break","continue","and","or","not","in","type","export","true","false","nil","self"]);
const LUA_BI = new Set(["game","workspace","script","task","math","table","string","os","bit32","Instance","Vector3","CFrame","Color3","UDim2","Enum","Random","Player","BasePart","Attachment","require","pairs","ipairs","print","warn","error","tostring","tonumber","typeof","pcall","setmetatable","New","OnEvent","Value","Spring","Computed","Fusion","RunService","Players","TweenService","hook","net","ents","timer","surface","draw","render","LocalPlayer","IsValid","include","AddCSLuaFile"]);

function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function hlLua(src) {
  const re = /(--\[\[[\s\S]*?\]\])|(--[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|([\s\S])/g;
  let out = "";
  const emit = (cls, text) => {
    const parts = escapeHtml(text).split("\n");
    out += parts.map((p) => (cls && p ? `<i class="tk-${cls}">${p}</i>` : p)).join("\n");
  };
  let m;
  while ((m = re.exec(src))) {
    if (m[1] || m[2]) emit("c", m[0]);
    else if (m[3]) emit("s", m[0]);
    else if (m[4]) emit("n", m[0]);
    else if (m[5]) {
      const w = m[0];
      if (LUA_KW.has(w)) emit("k", w);
      else if (LUA_BI.has(w)) emit("b", w);
      else if (/^\s*\(/.test(src.slice(re.lastIndex))) emit("f", w);
      else emit("", w);
    } else emit("", m[0]);
  }
  return out.split("\n").map((l) => `<span class="cl">${l || " "}</span>`).join("");
}

const modal = document.getElementById("modal");
const modalKicker = document.getElementById("modalKicker");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const copyBtn = document.getElementById("copyBtn");
let lastFocus = null;
let codeState = { p: null, cur: 0 };
let showState = null;

function openModal(kicker, title) {
  modalKicker.textContent = kicker;
  modalTitle.textContent = title;
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector(".modal-x").focus();
}

function closeModal() {
  modal.hidden = true;
  modalBody.innerHTML = "";
  copyBtn.hidden = true;
  showState = null;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}

function renderShow() {
  const { p, list, cur } = showState;
  const it = list[cur];
  let inner;
  if (it.type === "video") inner = `<video src="${it.src}" controls autoplay playsinline></video>`;
  else if (it.type === "yt") inner = `<iframe src="https://www.youtube-nocookie.com/embed/${it.src}?autoplay=1&rel=0" title="${p.name} showcase" allow="autoplay; fullscreen; encrypted-media" allowfullscreen></iframe>`;
  else inner = `<img src="${it.src}" alt="${p.name} screenshot">`;
  const nav = list.length > 1
    ? `<button class="vnav vnav-prev" data-nav="-1" aria-label="Previous">${prevSvg}</button>
       <button class="vnav vnav-next" data-nav="1" aria-label="Next">${nextSvg}</button>
       <span class="vcount">${cur + 1} / ${list.length}</span>`
    : "";
  modalBody.innerHTML = `<div class="vframe">${inner}${nav}</div>`;
}

function openVideo(i) {
  const p = DATA.projects[i];
  copyBtn.hidden = true;
  const list = mediaList(p);
  if (!list.length) {
    modalBody.innerHTML = `<div class="vframe vframe-empty" style="--tx:${i}">
      <span class="play-badge play-badge-lg">${playSvg}</span>
      <p class="vframe-note">No media linked yet.<br>
      <span>Set <code>yt: "VIDEO_ID"</code>, an <code>mp4</code> path, or <code>images</code> for <b>${p.name}</b> in <code>data.js</code>.</span></p>
    </div>`;
  } else {
    showState = { p, list, cur: 0 };
    renderShow();
  }
  openModal("Showcase", p.name);
}

function renderCode() {
  const p = codeState.p;
  const f = p.files[codeState.cur];
  const tabs = p.files.map((x, j) =>
    `<button class="code-filebtn${j === codeState.cur ? " on" : ""}" data-f="${j}">${x.private ? lockSvg : ""}${x.name}</button>`).join("");
  const body = f.private
    ? `<div class="code-private">${lockSvg}<p><b>${f.name}</b> · ${f.lines.toLocaleString()} lines${f.realm ? " · " + f.realm : ""}.<br><span>This file is private; source available on request.</span></p></div>`
    : `<pre class="code"><code>${hlLua(f.content)}</code></pre>`;
  modalBody.innerHTML = `<div class="code-wrap"><div class="code-files">${tabs}</div><div class="code-tab"><span class="code-dotrow"><i></i><i></i><i></i></span><span class="code-file">${f.name}</span>${f.realm ? `<span class="code-realm">${f.realm}</span>` : ""}<span class="code-lang">${f.lang || "Luau"}</span></div>${body}</div>`;
  copyBtn.hidden = f.private;
  copyBtn.textContent = "Copy";
  copyBtn.onclick = () => {
    navigator.clipboard?.writeText(f.content).then(
      () => { copyBtn.textContent = "Copied ✓"; setTimeout(() => (copyBtn.textContent = "Copy"), 1500); },
      () => { copyBtn.textContent = "Select + copy manually"; }
    );
  };
}

function openCode(i) {
  const p = DATA.projects[i];
  if (!hasCode(p)) return;
  const first = p.files.findIndex((f) => !f.private);
  codeState = { p, cur: first < 0 ? 0 : first };
  renderCode();
  openModal("Source", p.name);
}

document.addEventListener("click", (e) => {
  const nav = e.target.closest("[data-nav]");
  if (nav && showState) {
    const n = showState.list.length;
    showState.cur = (showState.cur + Number(nav.dataset.nav) + n) % n;
    renderShow();
    return;
  }
  const tab = e.target.closest(".code-filebtn");
  if (tab) {
    codeState.cur = Number(tab.dataset.f);
    renderCode();
    return;
  }
  const act = e.target.closest("[data-act]");
  if (act) {
    const i = Number(act.dataset.p);
    if (act.dataset.act === "video") openVideo(i);
    else openCode(i);
    return;
  }
  if (e.target.closest("[data-close]")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") return closeModal();
  if (showState && showState.list.length > 1) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const n = showState.list.length;
      showState.cur = (showState.cur + (e.key === "ArrowRight" ? 1 : -1) + n) % n;
      renderShow();
    }
  }
});

const discordBtn = document.getElementById("discordBtn");
if (discordBtn) {
  discordBtn.addEventListener("click", () => {
    navigator.clipboard?.writeText("k_lua_").then(() => {
      const label = discordBtn.querySelector("span");
      const prev = label.textContent;
      label.textContent = "Copied ✓";
      setTimeout(() => (label.textContent = prev), 1600);
    });
  });
}
