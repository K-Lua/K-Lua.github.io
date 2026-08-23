document.querySelector("[data-slot='projects']").innerHTML = DATA.projects.map((p, i) => `
  <div class="fx grid grid-cols-[auto_1fr] items-start gap-x-5 border-b py-6 sm:grid-cols-[auto_1fr_auto] sm:gap-x-8" ${rowBorder}>
    <span class="pt-2 font-code text-xs text-soft">${String(i + 1).padStart(2, "0")}</span>
    <div class="min-w-0">
      <h3 class="biglink text-[clamp(1.6rem,4.5vw,2.9rem)] font-bold leading-tight">${p.name}</h3>
      <p class="mt-1 max-w-xl text-sm text-soft">${p.desc}</p>
      <p class="mt-2 hidden text-xs text-soft sm:block">${p.tags.join(" · ")}</p>
      <div class="mt-3">${acts(i)}</div>
    </div>
    <div class="col-span-2 mt-4 sm:col-span-1 sm:mt-1 sm:w-44">
      ${thumb(p, i)}
    </div>
  </div>`).join("");

document.querySelector("[data-slot='jobs']").innerHTML = DATA.jobs.map((j) => `
  <div class="fx border-b py-6" ${rowBorder}>
    <div class="flex flex-wrap items-baseline justify-between gap-x-4">
      <h3 class="font-disp text-xl font-bold">${j.org}</h3>
      <span class="font-code text-xs text-soft">${j.time}</span>
    </div>
    <p class="mt-0.5 text-sm font-semibold text-brand">${j.role}</p>
    <p class="mt-2 max-w-2xl text-sm leading-relaxed text-soft">${j.desc}</p>
  </div>`).join("");

document.querySelector("[data-slot='skills']").innerHTML =
  DATA.skills.map((s) => `<span class="chip">${s}</span>`).join("");

const entryCount = document.getElementById("entryCount");
if (entryCount) entryCount.textContent = `${String(DATA.projects.length).padStart(2, "0")} entries`;

const root = document.documentElement;
root.classList.add("js");
document.querySelectorAll(".fx").forEach((el, i) => el.style.setProperty("--i", Math.min(i, 20)));
requestAnimationFrame(() => root.classList.add("play"));
