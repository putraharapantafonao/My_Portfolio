import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as uploadToGithub } from "./github_BsHlmNJn.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/upload-cv.ts
var upload_cv_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
var POST = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const file = (await request.formData()).get("cv");
		if (!file) return new Response(JSON.stringify({ error: "File tidak ditemukan" }), { status: 400 });
		if (!file.name.toLowerCase().endsWith(".pdf")) return new Response(JSON.stringify({ error: "Hanya diperbolehkan mengunggah file berekstensi .pdf" }), { status: 400 });
		const buffer = Buffer.from(await file.arrayBuffer());
		const publicDir = nodePath.resolve("public");
		const destPath = nodePath.join(publicDir, "resume.pdf");
		try {
			try {
				fs.mkdirSync(publicDir, { recursive: true });
			} catch (e) {}
			try {
				fs.writeFileSync(destPath, buffer);
			} catch (e) {}
		} catch (e) {}
		await uploadToGithub("public/resume.pdf", buffer.toString("base64"), "Upload resume", true);
		const profilePath = nodePath.resolve("src/data/profile.json");
		let profile = { resumeUrl: "/resume.pdf" };
		try {
			profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
			profile.resumeUrl = "/resume.pdf";
			fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), "utf-8");
		} catch (e) {}
		await uploadToGithub("src/data/profile.json", JSON.stringify(profile, null, 2), "Update resume URL");
		return new Response(JSON.stringify({
			success: true,
			url: "/resume.pdf"
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload-cv@_@ts
var page = () => upload_cv_exports;
//#endregion
export { page };
