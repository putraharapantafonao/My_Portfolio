import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as uploadToGithub } from "./github_BsHlmNJn.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/education.ts
var education_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	GET: () => GET,
	POST: () => POST,
	PUT: () => PUT
});
var filePath = nodePath.resolve("src/data/education.json");
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
	await uploadToGithub("src/data/education.json", JSON.stringify(data, null, 2), "Update education.json");
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
			institution: body.institution || "",
			institution_en: body.institution_en || "",
			degree: body.degree || "",
			degree_en: body.degree_en || "",
			startYear: body.startYear || "",
			endYear: body.endYear || "",
			description: body.description || "",
			description_en: body.description_en || "",
			logo: body.logo || ""
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
		if (index === -1) return new Response(JSON.stringify({ error: "Education not found" }), { status: 404 });
		data[index] = {
			...data[index],
			institution: body.institution !== void 0 ? body.institution : data[index].institution,
			institution_en: body.institution_en !== void 0 ? body.institution_en : data[index].institution_en,
			degree: body.degree !== void 0 ? body.degree : data[index].degree,
			degree_en: body.degree_en !== void 0 ? body.degree_en : data[index].degree_en,
			startYear: body.startYear !== void 0 ? body.startYear : data[index].startYear,
			endYear: body.endYear !== void 0 ? body.endYear : data[index].endYear,
			description: body.description !== void 0 ? body.description : data[index].description,
			description_en: body.description_en !== void 0 ? body.description_en : data[index].description_en,
			logo: body.logo !== void 0 ? body.logo : data[index].logo
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
//#region \0virtual:astro:page:src/pages/api/education@_@ts
var page = () => education_exports;
//#endregion
export { page };
