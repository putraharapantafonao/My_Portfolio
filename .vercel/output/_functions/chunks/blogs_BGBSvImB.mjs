import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as uploadToGithub } from "./github_BsHlmNJn.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/blogs.ts
var blogs_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var filePath = nodePath.resolve("src/data/blogs.json");
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
	await uploadToGithub("src/data/blogs.json", JSON.stringify(data, null, 2), "Update blogs.json");
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
		const formattedDate = (/* @__PURE__ */ new Date()).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
		const newItem = {
			id: Date.now().toString(),
			title: body.title || "",
			title_en: body.title_en || "",
			date: body.date || formattedDate,
			category: body.category || "Backend",
			summary: body.summary || "",
			summary_en: body.summary_en || "",
			image: body.image || "",
			content: body.content || "",
			content_en: body.content_en || ""
		};
		data.unshift(newItem);
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
		if (index === -1) return new Response(JSON.stringify({ error: "Blog not found" }), { status: 404 });
		data[index] = {
			...data[index],
			title: body.title !== void 0 ? body.title : data[index].title,
			title_en: body.title_en !== void 0 ? body.title_en : data[index].title_en,
			date: body.date !== void 0 ? body.date : data[index].date,
			category: body.category !== void 0 ? body.category : data[index].category,
			summary: body.summary !== void 0 ? body.summary : data[index].summary,
			summary_en: body.summary_en !== void 0 ? body.summary_en : data[index].summary_en,
			image: body.image !== void 0 ? body.image : data[index].image,
			content: body.content !== void 0 ? body.content : data[index].content,
			content_en: body.content_en !== void 0 ? body.content_en : data[index].content_en
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
//#region \0virtual:astro:page:src/pages/api/blogs@_@ts
var page = () => blogs_exports;
//#endregion
export { page };
