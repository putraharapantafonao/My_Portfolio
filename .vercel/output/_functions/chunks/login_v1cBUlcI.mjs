import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { h as renderHead, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { t as renderScript } from "./global_ct45DYur.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
//#region src/pages/admin/login.astro
var login_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Login,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Login = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Login;
	if (isAuthenticated(Astro.cookies)) return Astro.redirect("/admin");
	return renderTemplate`<html lang="id" data-astro-cid-xeimgta2><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login Admin - Portofolio</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="bg-slate-950 text-slate-200 antialiased min-h-screen flex items-center justify-center p-4" data-astro-cid-xeimgta2><div class="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl shadow-indigo-500/5" data-astro-cid-xeimgta2><!-- Glow effect --><div class="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" data-astro-cid-xeimgta2></div><div class="absolute -bottom-40 -right-40 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl" data-astro-cid-xeimgta2></div><div class="relative flex flex-col items-center" data-astro-cid-xeimgta2><!-- Shield icon --><div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl mb-6 shadow-lg shadow-indigo-500/10" data-astro-cid-xeimgta2><i class="fas fa-user-shield" data-astro-cid-xeimgta2></i></div><h1 class="text-2xl font-bold text-white mb-2" data-astro-cid-xeimgta2>Admin Login</h1><p class="text-slate-400 text-sm text-center mb-8" data-astro-cid-xeimgta2>Masukkan kode akses admin untuk mengelola portofolio Anda.</p><form id="login-form" class="w-full space-y-6" data-astro-cid-xeimgta2><div data-astro-cid-xeimgta2><label for="passcode" class="block text-xs font-semibold text-slate-400 mb-2" data-astro-cid-xeimgta2>Kode Akses (Passcode)</label><div class="relative" data-astro-cid-xeimgta2><span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" data-astro-cid-xeimgta2><i class="fas fa-lock" data-astro-cid-xeimgta2></i></span><input id="passcode" type="password" required placeholder="Masukkan passcode" class="w-full pl-11 pr-11 py-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors" data-astro-cid-xeimgta2><button type="button" id="toggle-password" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300" data-astro-cid-xeimgta2><i class="fas fa-eye" data-astro-cid-xeimgta2></i></button></div></div><div id="error-msg" class="hidden p-3.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-medium flex items-center gap-2" data-astro-cid-xeimgta2><i class="fas fa-exclamation-circle" data-astro-cid-xeimgta2></i><span id="error-text" data-astro-cid-xeimgta2></span></div><button type="submit" class="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/20 active:scale-[0.98] cursor-pointer" data-astro-cid-xeimgta2><i class="fas fa-sign-in-alt" data-astro-cid-xeimgta2></i>Masuk ke Dashboard</button></form><a href="/" class="mt-8 text-xs text-slate-500 hover:text-slate-300 transition-colors" data-astro-cid-xeimgta2><i class="fas fa-arrow-left mr-1.5" data-astro-cid-xeimgta2></i>Kembali ke Portofolio</a></div></div>${renderScript($$result, "D:/my-portfolio/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/my-portfolio/src/pages/admin/login.astro", void 0);
var $$file = "D:/my-portfolio/src/pages/admin/login.astro";
var $$url = "/admin/login";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/login@_@astro
var page = () => login_exports;
//#endregion
export { page };
