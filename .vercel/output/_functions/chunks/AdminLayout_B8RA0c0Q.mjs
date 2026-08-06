import { g as addAttribute, h as renderHead, s as renderSlot, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { t as renderScript } from "./global_ct45DYur.mjs";
//#region src/layouts/AdminLayout.astro
createAstro("https://astro.build");
var $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminLayout;
	const { title = "Admin Dashboard", activeTab = "dashboard" } = Astro.props;
	return renderTemplate`<html lang="id" data-astro-cid-w6su3bgr><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Admin Panel</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"><!-- Sync theme initialization to prevent flash --><script>
      const theme = (() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'dark';
        }
        return 'light';
      })();
      
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.localStorage.setItem('theme', theme);
    <\/script>${renderHead($$result)}</head><body class="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 antialiased min-h-screen flex flex-col md:flex-row transition-colors duration-300" data-astro-cid-w6su3bgr><!-- Sidebar --><aside class="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 transition-colors" data-astro-cid-w6su3bgr><div class="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 justify-between" data-astro-cid-w6su3bgr><span class="text-lg font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 text-transparent bg-clip-text" data-astro-cid-w6su3bgr>Putra Admin</span><a href="/" target="_blank" class="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold" data-astro-cid-w6su3bgr><i class="fas fa-external-link-alt mr-1" data-astro-cid-w6su3bgr></i>Lihat Site</a></div><nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto" data-astro-cid-w6su3bgr><!-- TENTANG SAYA --><div data-astro-cid-w6su3bgr><h3 class="px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3" data-astro-cid-w6su3bgr>Tentang Saya</h3><div class="space-y-1" data-astro-cid-w6su3bgr>${[
		{
			id: "dashboard",
			label: "Overview",
			href: "/admin",
			icon: "fas fa-chart-pie"
		},
		{
			id: "profile",
			label: "Profil",
			href: "/admin/profile",
			icon: "fas fa-user-edit"
		},
		{
			id: "education",
			label: "Pendidikan",
			href: "/admin/education",
			icon: "fas fa-graduation-cap"
		},
		{
			id: "skills",
			label: "Keterampilan",
			href: "/admin/skills",
			icon: "fas fa-laptop-code"
		}
	].map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40"}`, "class")} data-astro-cid-w6su3bgr><i${addAttribute(`${item.icon} w-5 text-center text-base`, "class")} data-astro-cid-w6su3bgr></i>${item.label}</a>`)}</div></div><!-- DASHBOARD --><div data-astro-cid-w6su3bgr><h3 class="px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3" data-astro-cid-w6su3bgr>Dashboard</h3><div class="space-y-1" data-astro-cid-w6su3bgr>${[
		{
			id: "projects",
			label: "Proyek",
			href: "/admin/projects",
			icon: "fas fa-folder-open"
		},
		{
			id: "publications",
			label: "Publikasi",
			href: "/admin/publications",
			icon: "fas fa-book-open"
		},
		{
			id: "certificates",
			label: "Sertifikat",
			href: "/admin/certificates",
			icon: "fas fa-award"
		},
		{
			id: "blogs",
			label: "Blog",
			href: "/admin/blogs",
			icon: "fas fa-pen-nib"
		}
	].map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/40"}`, "class")} data-astro-cid-w6su3bgr><i${addAttribute(`${item.icon} w-5 text-center text-base`, "class")} data-astro-cid-w6su3bgr></i>${item.label}</a>`)}</div></div></nav><div class="p-4 border-t border-slate-200 dark:border-slate-800" data-astro-cid-w6su3bgr><button id="logout-btn" class="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-all cursor-pointer" data-astro-cid-w6su3bgr><i class="fas fa-sign-out-alt w-5 text-center text-base" data-astro-cid-w6su3bgr></i>Keluar (Logout)</button></div></aside><!-- Main Content Area --><div class="flex-1 flex flex-col min-w-0 min-h-screen" data-astro-cid-w6su3bgr><!-- Header --><header class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0 transition-colors" data-astro-cid-w6su3bgr><h1 class="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight" data-astro-cid-w6su3bgr>${title}</h1><div class="flex items-center gap-4" data-astro-cid-w6su3bgr><!-- Light/Dark Toggler --><button id="theme-toggle" class="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all cursor-pointer shadow-sm" aria-label="Toggle Theme" data-astro-cid-w6su3bgr><i class="fas fa-sun hidden dark:inline-block" data-astro-cid-w6su3bgr></i><i class="fas fa-moon inline-block dark:hidden" data-astro-cid-w6su3bgr></i></button><div class="flex items-center gap-2" data-astro-cid-w6su3bgr><span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" data-astro-cid-w6su3bgr></span><span class="text-xs text-slate-600 dark:text-slate-400 font-bold bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800" data-astro-cid-w6su3bgr>Administrator</span></div></div></header><!-- Content --><main class="flex-1 p-8 overflow-y-auto" data-astro-cid-w6su3bgr>${renderSlot($$result, $$slots["default"])}</main><!-- Admin Footer --><footer class="py-4 border-t border-slate-200 dark:border-slate-800 text-center" data-astro-cid-w6su3bgr><p class="text-[11px] text-slate-500 font-medium" data-astro-cid-w6su3bgr>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} <span class="font-bold" data-astro-cid-w6su3bgr>Putra Admin Panel</span> — Built with <span class="text-red-500" data-astro-cid-w6su3bgr>♥</span> using Astro.</p></footer></div><!-- Reusable Toast Component Container --><div id="toast-container" class="fixed bottom-5 right-5 z-50 flex flex-col gap-2" data-astro-cid-w6su3bgr></div>${renderScript($$result, "D:/my-portfolio/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/my-portfolio/src/layouts/AdminLayout.astro", void 0);
//#endregion
export { $$AdminLayout as t };
