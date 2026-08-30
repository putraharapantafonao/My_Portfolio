import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { S as unescapeHTML, g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { n as parseSummary } from "./markdown_Cw6nFbiA.mjs";
import { t as $$Layout } from "./Layout_DuHTCsic.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/blog.astro
var blog_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Blog,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Blog = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Blog;
	const blogs = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/blogs.json"), "utf-8"));
	const lang = Astro.cookies.get("lang")?.value === "en" ? "en" : "id";
	function getField(item, field) {
		if (lang === "en") return item[`${field}_en`] || item[field] || "";
		return item[field] || "";
	}
	const t = {
		id: {
			blogTitle: "Catatan Teknis & Blog",
			blogSub: "Tulisan, opini, dan catatan teknis mengenai teknologi, pengembangan web, dan hal menarik lainnya.",
			readMore: "Baca Selengkapnya →"
		},
		en: {
			blogTitle: "Technical Notes & Blog",
			blogSub: "Writings, opinions, and technical notes regarding technology, web development, and other interesting topics.",
			readMore: "Read More →"
		}
	}[lang];
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": t.blogTitle,
		"activePage": "blog"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section id="blog" class="py-20 md:py-28 transition-colors"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="mb-10"><h1 class="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text inline-block">${t.blogTitle}</h1><p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl leading-relaxed">${t.blogSub}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-8">${blogs.map((b) => renderTemplate`<article class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"><div>${b.image && renderTemplate`<div class="h-48 overflow-hidden border-b border-slate-100 dark:border-slate-850"><img${addAttribute(b.image, "src")}${addAttribute(getField(b, "title"), "alt")} class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" onerror="this.style.display='none'"></div>`}<div class="p-6"><div class="flex items-center justify-between text-xs text-slate-400 mb-3 font-semibold"><span class="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-950 border border-slate-250/60 dark:border-slate-800/80 text-slate-500">${b.category}</span><time${addAttribute(b.date, "datetime")}>${b.date}</time></div><a${addAttribute(`/blog/${b.id}`, "href")}><h3 class="text-base font-bold text-slate-950 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${getField(b, "title")}</h3></a><p class="text-slate-500 dark:text-slate-350 text-xs mt-3 leading-relaxed line-clamp-2">${unescapeHTML(parseSummary(getField(b, "summary")))}</p></div></div><div class="px-6 pb-6 pt-2"><a${addAttribute(`/blog/${b.id}`, "href")} class="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 inline-flex items-center gap-1">${t.readMore}</a></div></article>`)}</div></div></section>` })}`;
}, "D:/my-portfolio/src/pages/blog.astro", void 0);
var $$file = "D:/my-portfolio/src/pages/blog.astro";
var $$url = "/blog";
//#endregion
//#region \0virtual:astro:page:src/pages/blog@_@astro
var page = () => blog_exports;
//#endregion
export { page };
