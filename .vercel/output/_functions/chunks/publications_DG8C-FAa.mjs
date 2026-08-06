import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as uploadToGithub } from "./github_BsHlmNJn.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/publications.ts
var publications_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var filePath = nodePath.resolve("src/data/publications.json");
function readData() {
	if (!fs.existsSync(filePath)) {
		fs.mkdirSync(nodePath.dirname(filePath), { recursive: true });
		fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
	}
	return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
async function writeData(data) {
	fs.mkdirSync(nodePath.dirname(filePath), { recursive: true });
	try {
		fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
	} catch (e) {}
	await uploadToGithub("src/data/publications.json", JSON.stringify(data, null, 2), "Update publications.json");
}
var GET = async () => {
	try {
		const data = readData();
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
		const data = readData();
		const newItem = {
			id: Date.now().toString(),
			title: body.title || "",
			title_en: body.title_en || "",
			journal: body.journal || "",
			journal_en: body.journal_en || "",
			details: body.details || "",
			status: body.status || "Terbit",
			status_en: body.status_en || "",
			abstract: body.abstract || "",
			abstract_en: body.abstract_en || "",
			link: body.link || "#",
			date: body.date || ""
		};
		data.push(newItem);
		await writeData(data);
		return new Response(JSON.stringify(newItem), {
			status: 201,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var PUT = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const body = await request.json();
		if (!body.id) return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
		const data = readData();
		const index = data.findIndex((item) => item.id === body.id);
		if (index === -1) return new Response(JSON.stringify({ error: "Publication not found" }), { status: 404 });
		data[index] = {
			...data[index],
			title: body.title !== void 0 ? body.title : data[index].title,
			title_en: body.title_en !== void 0 ? body.title_en : data[index].title_en,
			journal: body.journal !== void 0 ? body.journal : data[index].journal,
			journal_en: body.journal_en !== void 0 ? body.journal_en : data[index].journal_en,
			details: body.details !== void 0 ? body.details : data[index].details,
			status: body.status !== void 0 ? body.status : data[index].status,
			status_en: body.status_en !== void 0 ? body.status_en : data[index].status_en,
			abstract: body.abstract !== void 0 ? body.abstract : data[index].abstract,
			abstract_en: body.abstract_en !== void 0 ? body.abstract_en : data[index].abstract_en,
			link: body.link !== void 0 ? body.link : data[index].link,
			date: body.date !== void 0 ? body.date : data[index].date
		};
		await writeData(data);
		return new Response(JSON.stringify(data[index]), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var DELETE = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const id = new URL(request.url).searchParams.get("id");
		if (!id) return new Response(JSON.stringify({ error: "Missing id parameter" }), { status: 400 });
		writeData(readData().filter((item) => item.id !== id));
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/publications@_@ts
var page = () => publications_exports;
//#endregion
export { page };
