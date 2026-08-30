import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { t as $$Layout } from "./Layout_DuHTCsic.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/projects.astro
var projects_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Projects,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Projects = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Projects;
	const projects = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/projects.json"), "utf-8"));
	const lang = Astro.cookies.get("lang")?.value === "en" ? "en" : "id";
	function getField(item, field) {
		if (lang === "en") return item[`${field}_en`] || item[field] || "";
		return item[field] || "";
	}
	const t = {
		id: {
			projectsTitle: "Proyek",
			projectsSub: "Beberapa proyek yang saya kembangkan dalam bidang pengembangan web, sistem informasi, dan kecerdasan buatan.",
			notPublished: "Belum Dipublikasikan"
		},
		en: {
			projectsTitle: "Projects",
			projectsSub: "Some of the projects I have developed in web development, information systems, and artificial intelligence.",
			notPublished: "Not Yet Published"
		}
	}[lang];
	const sortedProjects = projects.sort((a, b) => {
		const dateA = a.date || "0000-00";
		return (b.date || "0000-00").localeCompare(dateA);
	});
	function formatDate(dateStr) {
		if (!dateStr) return "";
		try {
			return new Date(dateStr).toLocaleDateString(lang === "en" ? "en-US" : "id-ID", {
				day: "numeric",
				month: "long",
				year: "numeric"
			});
		} catch (e) {
			return dateStr;
		}
	}
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": t.projectsTitle,
		"activePage": "projects"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section id="projects" class="py-20 md:py-28 bg-slate-50/40 dark:bg-slate-900/20 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"><div><h1 class="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text inline-block">${t.projectsTitle}</h1><p class="text-slate-500 dark:text-slate-400 text-sm mt-3 max-w-xl leading-relaxed">${t.projectsSub}</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8">${sortedProjects.map((item) => renderTemplate`<article class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"><div class="h-48 overflow-hidden relative border-b border-slate-100 dark:border-slate-800"><img${addAttribute(item.image, "src")}${addAttribute(`Tampilan proyek ${getField(item, "title")}`, "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"${addAttribute(`this.onerror=null;this.src='${item.fallbackImg || "https://placehold.co/600x400/020617/818cf8?text=Project"}';`, "onerror")}><div class="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent"></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div>${item.date && renderTemplate`<div class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5"><i class="fas fa-calendar-alt text-indigo-500/70"></i>${formatDate(item.date)}</div>`}<h3 class="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">${getField(item, "title")}</h3><p class="text-slate-500 dark:text-slate-350 text-xs leading-relaxed mb-4 line-clamp-4">${getField(item, "description")}</p><div class="flex flex-wrap gap-1.5 mb-6">${item.tags?.map((tag) => renderTemplate`<span class="px-2 py-1 text-[10px] font-bold rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400">${tag}</span>`)}</div></div><div class="pt-4 border-t border-slate-100 dark:border-slate-850 flex gap-2">${item.link && item.link !== "#" ? renderTemplate`<a${addAttribute(item.link, "href")} target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-bold transition-all shadow-md active:scale-[0.98]"><i class="fab fa-github"></i>${lang === "en" ? "Code" : "Kode"}</a>` : null}${item.demoUrl && item.demoUrl !== "#" ? renderTemplate`<a${addAttribute(item.demoUrl, "href")} target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98]"><i class="fas fa-external-link-alt"></i>Demo</a>` : null}${(!item.link || item.link === "#") && (!item.demoUrl || item.demoUrl === "#") ? renderTemplate`<span class="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold cursor-not-allowed"><i class="fas fa-clock"></i>${t.notPublished}</span>` : null}</div></div></article>`)}</div></div></section>` })}`;
}, "D:/my-portfolio/src/pages/projects.astro", void 0);
var $$file = "D:/my-portfolio/src/pages/projects.astro";
var $$url = "/projects";
//#endregion
//#region \0virtual:astro:page:src/pages/projects@_@astro
var page = () => projects_exports;
//#endregion
export { page };
