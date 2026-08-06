import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { t as $$Layout } from "./Layout_DuHTCsic.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/publications.astro
var publications_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Publications,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Publications = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Publications;
	const publications = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/publications.json"), "utf-8"));
	const lang = Astro.cookies.get("lang")?.value === "en" ? "en" : "id";
	function getField(item, field) {
		if (lang === "en") return item[`${field}_en`] || item[field] || "";
		return item[field] || "";
	}
	const t = {
		id: {
			pubTitle: "Publikasi Ilmiah",
			pubSub: "Daftar artikel, jurnal, dan karya tulis ilmiah yang telah saya terbitkan."
		},
		en: {
			pubTitle: "Scientific Publications",
			pubSub: "List of articles, journals, and scientific papers that I have published."
		}
	}[lang];
	const sortedPublications = publications.sort((a, b) => {
		const dateA = a.date || "0000-00-00";
		return (b.date || "0000-00-00").localeCompare(dateA);
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
		"title": t.pubTitle,
		"activePage": "publications"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section id="publications" class="py-20 md:py-28 bg-white dark:bg-slate-950 transition-colors"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-10"><h1 class="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text inline-block">${t.pubTitle}</h1><p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl leading-relaxed">${t.pubSub}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${sortedPublications.map((pub) => renderTemplate`<article class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"><div class="h-48 overflow-hidden relative border-b border-slate-100 dark:border-slate-800">${pub.image ? renderTemplate`<img${addAttribute(pub.image, "src")}${addAttribute(getField(pub, "title"), "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" onerror="this.onerror=null;this.src='https://placehold.co/600x400/020617/818cf8?text=Publikasi';">` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 flex items-center justify-center"><i class="fas fa-book-open text-4xl text-emerald-400/40"></i></div>`}<div class="absolute inset-0 bg-gradient-to-t from-slate-950/30 to-transparent"></div></div><div class="p-6 flex-1 flex flex-col justify-between"><div><div class="flex flex-wrap gap-1.5 mb-3"><span class="px-2 py-1 text-[10px] font-bold rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400">✓ ${getField(pub, "status")}</span>${pub.details && renderTemplate`<span class="px-2 py-1 text-[10px] font-bold rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 text-slate-500 dark:text-slate-400">${pub.details}</span>`}</div>${pub.date && renderTemplate`<div class="text-[10px] text-slate-400 dark:text-slate-500 font-semibold mb-1.5 flex items-center gap-1.5"><i class="fas fa-calendar-alt text-indigo-500/70"></i>${formatDate(pub.date)}</div>`}<h3 class="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug line-clamp-2">${getField(pub, "title")}</h3><p class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-3">${getField(pub, "journal")}</p><p class="text-slate-500 dark:text-slate-350 text-xs leading-relaxed line-clamp-4 italic">"${getField(pub, "abstract")}"</p></div><div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-850">${pub.link && pub.link !== "#" ? renderTemplate`<a${addAttribute(pub.link, "href")} target="_blank" rel="noopener noreferrer" class="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-[0.98]"><i class="fas fa-external-link-alt"></i>${lang === "en" ? "View Publication ↗" : "Lihat Publikasi ↗"}</a>` : renderTemplate`<span class="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold cursor-not-allowed"><i class="fas fa-clock"></i>${lang === "en" ? "Link Not Available" : "Tautan Belum Tersedia"}</span>`}</div></div></article>`)}</div></div></section>` })}`;
}, "D:/my-portfolio/src/pages/publications.astro", void 0);
var $$file = "D:/my-portfolio/src/pages/publications.astro";
var $$url = "/publications";
//#endregion
//#region \0virtual:astro:page:src/pages/publications@_@astro
var page = () => publications_exports;
//#endregion
export { page };
