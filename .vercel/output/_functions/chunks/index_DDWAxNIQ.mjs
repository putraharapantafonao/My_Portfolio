import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as $$AdminLayout } from "./AdminLayout_B8RA0c0Q.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Index = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	if (!isAuthenticated(Astro.cookies)) return Astro.redirect("/admin/login");
	const profile = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/profile.json"), "utf-8"));
	JSON.parse(fs.readFileSync(nodePath.resolve("src/data/skills.json"), "utf-8"));
	const projects = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/projects.json"), "utf-8"));
	const publications = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/publications.json"), "utf-8"));
	const certificates = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/certificates.json"), "utf-8"));
	const blogs = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/blogs.json"), "utf-8"));
	const stats = [
		{
			label: "Proyek Utama",
			count: projects.length,
			icon: "fas fa-folder-open"
		},
		{
			label: "Publikasi Ilmiah",
			count: publications.length,
			icon: "fas fa-book-open"
		},
		{
			label: "Sertifikasi",
			count: certificates.length,
			icon: "fas fa-award"
		},
		{
			label: "Artikel Blog",
			count: blogs.length,
			icon: "fas fa-pen-nib"
		}
	];
	const cards = [
		{
			id: "profile",
			title: "Profil Utama",
			desc: "Ubah nama, peran, deskripsi singkat, bio, lokasi, dan link CV.",
			icon: "fas fa-user-edit",
			href: "/admin/profile"
		},
		{
			id: "skills",
			title: "Keterampilan",
			desc: "Kelola bahasa pemrograman, framework, library, dan alat kustom.",
			icon: "fas fa-laptop-code",
			href: "/admin/skills"
		},
		{
			id: "projects",
			title: "Proyek Utama",
			desc: "Tambah, edit, dan hapus rekam jejak proyek beserta tautan GitHub.",
			icon: "fas fa-folder-open",
			href: "/admin/projects"
		},
		{
			id: "publications",
			title: "Publikasi Ilmiah",
			desc: "Kelola draf atau artikel ilmiah yang terindeks Google Scholar.",
			icon: "fas fa-book-open",
			href: "/admin/publications"
		},
		{
			id: "certificates",
			title: "Sertifikasi & Kredensial",
			desc: "Kelola sertifikat kompetensi profesional dari Dicoding, dll.",
			icon: "fas fa-award",
			href: "/admin/certificates"
		},
		{
			id: "blogs",
			title: "Blog Teknis",
			desc: "Tulis, perbarui, atau hapus artikel serta catatan pemrograman.",
			icon: "fas fa-pen-nib",
			href: "/admin/blogs"
		}
	];
	return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {
		"title": "Dashboard Utama",
		"activeTab": "dashboard"
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<div class="bg-gradient-to-r from-slate-100 via-indigo-50/20 to-slate-100 dark:from-slate-900 dark:via-indigo-950/20 dark:to-slate-900 border border-slate-200 dark:border-indigo-500/10 p-8 rounded-3xl mb-8 relative overflow-hidden"><div class="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-2xl"></div><h2 class="text-2xl font-bold text-slate-955 dark:text-white mb-2">Selamat Datang, ${profile.name}!</h2><p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl leading-relaxed">Gunakan panel administrasi ini untuk mengelola semua elemen portofolio Anda secara real-time. Perubahan yang Anda simpan akan langsung memperbarui tampilan utama portofolio.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">${stats.map((stat) => renderTemplate`<div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-sm"><div><span class="block text-xs font-bold text-slate-400 dark:text-slate-500 mb-1">${stat.label}</span><span class="text-3xl font-extrabold text-slate-900 dark:text-white">${stat.count}</span></div><div class="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg"><i${addAttribute(stat.icon, "class")}></i></div></div>`)}</div><h3 class="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2"><i class="fas fa-tasks text-indigo-600 dark:text-indigo-400"></i>Menu Manajemen Portofolio</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">${cards.map((card) => renderTemplate`<a${addAttribute(card.href, "href")} class="group bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-indigo-500/30 dark:hover:border-indigo-500/30 p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm"><div><div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-lg mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"><i${addAttribute(card.icon, "class")}></i></div><h4 class="text-md font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${card.title}</h4><p class="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-6">${card.desc}</p></div><div class="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 inline-flex items-center gap-1.5 self-start">Kelola Sekarang <i class="fas fa-chevron-right text-[10px] transition-transform group-hover:translate-x-1"></i></div></a>`)}</div>` })}`;
}, "D:/my-portfolio/src/pages/admin/index.astro", void 0);
var $$file = "D:/my-portfolio/src/pages/admin/index.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
