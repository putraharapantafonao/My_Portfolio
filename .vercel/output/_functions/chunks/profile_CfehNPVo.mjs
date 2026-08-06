import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as uploadToGithub } from "./github_BsHlmNJn.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/profile.ts
var profile_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var filePath = nodePath.resolve("src/data/profile.json");
var GET = async () => {
	try {
		const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
		return new Response(JSON.stringify(data), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var POST = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const body = await request.json();
		fs.mkdirSync(nodePath.dirname(filePath), { recursive: true });
		let existing = {};
		if (fs.existsSync(filePath)) try {
			existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
		} catch (e) {}
		const merged = {
			...existing,
			...body
		};
		try {
			fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), "utf-8");
		} catch (e) {}
		await uploadToGithub("src/data/profile.json", JSON.stringify(merged, null, 2), "Update profile");
		return new Response(JSON.stringify({
			success: true,
			data: merged
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/profile@_@ts
var page = () => profile_exports;
//#endregion
export { page };
