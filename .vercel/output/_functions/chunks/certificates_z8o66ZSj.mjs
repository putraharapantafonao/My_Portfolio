import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate, w as createAstro } from "./server_B_hu0jgv.mjs";
import { t as createComponent } from "./compiler_uT6rBWMH.mjs";
import { t as $$Layout } from "./Layout_DuHTCsic.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/certificates.astro
var certificates_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Certificates,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Certificates = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Certificates;
	const certificates = JSON.parse(fs.readFileSync(nodePath.resolve("src/data/certificates.json"), "utf-8"));
	const lang = Astro.cookies.get("lang")?.value === "en" ? "en" : "id";
	function getField(item, field) {
		if (lang === "en") return item[`${field}_en`] || item[field] || "";
		return item[field] || "";
	}
	const t = {
		id: {
			certTitle: "Sertifikat & Kredensial",
			certSub: "Kumpulan sertifikat, lisensi kompetensi, dan penghargaan yang saya miliki.",
			verified: "Terverifikasi",
			viewCred: "Lihat Kredensial"
		},
		en: {
			certTitle: "Certificates & Credentials",
			certSub: "A collection of certificates, competency licenses, and awards I have acquired.",
			verified: "Verified",
			viewCred: "View Credential"
		}
	}[lang];
	const sortedCertificates = certificates.sort((a, b) => {
		const dateA = a.issueDate || "0000-00";
		return (b.issueDate || "0000-00").localeCompare(dateA);
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
		"title": t.certTitle,
		"activePage": "certificates",
		"data-astro-cid-s33s5tjx": true
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<section id="certificates" class="py-20 md:py-28 bg-slate-50/40 dark:bg-slate-900/20 transition-colors" data-astro-cid-s33s5tjx><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" data-astro-cid-s33s5tjx><div class="mb-10" data-astro-cid-s33s5tjx><h1 class="text-3xl md:text-4xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text inline-block" data-astro-cid-s33s5tjx>${t.certTitle}</h1><p class="text-slate-500 dark:text-slate-400 text-sm max-w-xl leading-relaxed" data-astro-cid-s33s5tjx>${t.certSub}</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" data-astro-cid-s33s5tjx>${sortedCertificates.map((cert) => renderTemplate`<article class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group" data-astro-cid-s33s5tjx><!-- Area foto landscape (rasio 4:3 seperti sertifikat) --><div class="relative w-full overflow-hidden border-b border-slate-100 dark:border-slate-800 cursor-pointer" style="aspect-ratio: 4/3;"${addAttribute(cert.image || "", "data-cert-img")}${addAttribute(getField(cert, "title"), "data-cert-title")} onclick="openCertLightbox(this)" data-astro-cid-s33s5tjx>${cert.image ? renderTemplate`<img${addAttribute(cert.image, "src")}${addAttribute(getField(cert, "title"), "alt")} loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null;this.src='https://placehold.co/800x600/020617/818cf8?text=Sertifikat';" data-astro-cid-s33s5tjx>` : renderTemplate`<div class="w-full h-full bg-gradient-to-br from-indigo-950 via-slate-900 to-violet-950 flex flex-col items-center justify-center gap-3" data-astro-cid-s33s5tjx><div class="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl" data-astro-cid-s33s5tjx><i${addAttribute(cert.icon || "fas fa-award", "class")} data-astro-cid-s33s5tjx></i></div><span class="text-slate-500 dark:text-slate-600 text-xs font-bold tracking-widest uppercase" data-astro-cid-s33s5tjx>Certificate</span></div>`}<div class="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent" data-astro-cid-s33s5tjx></div>${cert.image && renderTemplate`<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/30" data-astro-cid-s33s5tjx><div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-lg" data-astro-cid-s33s5tjx><i class="fas fa-search-plus" data-astro-cid-s33s5tjx></i></div></div>`}</div><!-- Konten card --><div class="p-5 flex-1 flex flex-col justify-between" data-astro-cid-s33s5tjx><div data-astro-cid-s33s5tjx><span class="inline-block px-2 py-0.5 text-[9px] font-bold rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 mb-2" data-astro-cid-s33s5tjx>${cert.issuer}</span><h3 class="text-sm font-bold text-slate-950 dark:text-white mb-2 leading-snug line-clamp-2"${addAttribute(getField(cert, "title"), "title")} data-astro-cid-s33s5tjx>${getField(cert, "title")}</h3>${cert.credentialId && renderTemplate`<div class="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-400 dark:text-slate-500" data-astro-cid-s33s5tjx><span class="font-mono truncate" data-astro-cid-s33s5tjx>ID: ${cert.credentialId}</span></div>`}<p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1" data-astro-cid-s33s5tjx>${lang === "en" ? "Issued" : "Terbit"}: ${formatDate(cert.issueDate)} &nbsp;•&nbsp; ${lang === "en" ? "Expires" : "Kedaluwarsa"}: ${cert.expirationDate ? formatDate(cert.expirationDate) : lang === "en" ? "No Expiration Date" : "Tidak Ada Kedaluwarsa"}</p></div><div class="pt-4 mt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-3" data-astro-cid-s33s5tjx><span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-100/50 dark:border-emerald-900/30 shrink-0" data-astro-cid-s33s5tjx><span class="w-1.5 h-1.5 rounded-full bg-emerald-500" data-astro-cid-s33s5tjx></span>${t.verified}</span>${cert.verifyUrl && cert.verifyUrl !== "#" && cert.verifyUrl !== "" ? renderTemplate`<a${addAttribute(cert.verifyUrl, "href")} target="_blank" rel="noopener noreferrer" class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98]" data-astro-cid-s33s5tjx>${t.viewCred}<i class="fas fa-external-link-alt text-[9px]" data-astro-cid-s33s5tjx></i></a>` : renderTemplate`<span class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 text-xs font-bold cursor-not-allowed" data-astro-cid-s33s5tjx><i class="fas fa-link-slash text-[9px]" data-astro-cid-s33s5tjx></i>${lang === "en" ? "No Credential Link" : "Tidak Ada Tautan"}</span>`}</div></div></article>`)}</div></div></section><div id="cert-lightbox" class="fixed inset-0 z-[9999] hidden items-center justify-center p-4" onclick="closeCertLightbox(event)" data-astro-cid-s33s5tjx><!-- Backdrop blur --><div class="absolute inset-0 bg-slate-950/90 backdrop-blur-md" data-astro-cid-s33s5tjx></div><!-- Container gambar --><div class="relative z-10 w-full max-w-4xl animate-[zoomIn_0.25s_ease-out]" data-astro-cid-s33s5tjx><!-- Tombol tutup --><button onclick="document.getElementById('cert-lightbox').classList.replace('flex','hidden')" class="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center text-lg transition-all cursor-pointer" data-astro-cid-s33s5tjx><i class="fas fa-times" data-astro-cid-s33s5tjx></i></button><!-- Gambar --><img id="cert-lightbox-img" src="" alt="" class="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl shadow-black/50 border border-white/10" data-astro-cid-s33s5tjx><!-- Caption --><p id="cert-lightbox-title" class="mt-4 text-center text-sm font-semibold text-slate-300" data-astro-cid-s33s5tjx></p></div></div><script>
      function openCertLightbox(el) {
        const imgSrc = el.getAttribute('data-cert-img');
        if (!imgSrc) return;
        const title = el.getAttribute('data-cert-title') || '';
        const lightbox = document.getElementById('cert-lightbox');
        const img = document.getElementById('cert-lightbox-img');
        const caption = document.getElementById('cert-lightbox-title');
        img.src = imgSrc;
        img.alt = title;
        caption.textContent = title;
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }

      function closeCertLightbox(e) {
        const target = e.target;
        if (target.closest('#cert-lightbox > div:last-of-type')) return;
        const lightbox = document.getElementById('cert-lightbox');
        lightbox.classList.replace('flex', 'hidden');
        document.body.style.overflow = '';
      }

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          const lightbox = document.getElementById('cert-lightbox');
          if (!lightbox.classList.contains('hidden')) {
            lightbox.classList.replace('flex', 'hidden');
            document.body.style.overflow = '';
          }
        }
      });

      window.openCertLightbox = openCertLightbox;
      window.closeCertLightbox = closeCertLightbox;
    <\/script>` })}`;
}, "D:/my-portfolio/src/pages/certificates.astro", void 0);
var $$file = "D:/my-portfolio/src/pages/certificates.astro";
var $$url = "/certificates";
//#endregion
//#region \0virtual:astro:page:src/pages/certificates@_@astro
var page = () => certificates_exports;
//#endregion
export { page };
