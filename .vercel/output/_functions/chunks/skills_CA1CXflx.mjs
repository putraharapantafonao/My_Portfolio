import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/skills.ts
var skills_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var filePath = nodePath.resolve("src/data/skills.json");
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
		fs.writeFileSync(filePath, JSON.stringify(body, null, 2), "utf-8");
		return new Response(JSON.stringify({
			success: true,
			data: body
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/skills@_@ts
var page = () => skills_exports;
//#endregion
export { page };
