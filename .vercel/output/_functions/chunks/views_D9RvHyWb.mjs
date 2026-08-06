import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "@upstash/redis";
//#region src/pages/api/views.ts
var views_exports = /* @__PURE__ */ __exportAll({
	GET: () => GET,
	POST: () => POST
});
var GET = async ({ request }) => {
	if (!new URL(request.url).searchParams.get("slug")) return new Response(JSON.stringify({ error: "Slug parameter is required" }), { status: 400 });
	return new Response(JSON.stringify({ views: 0 }), {
		status: 200,
		headers: { "Content-Type": "application/json" }
	});
};
var POST = async ({ request }) => {
	try {
		if (!(await request.json()).slug) return new Response(JSON.stringify({ error: "Slug is required" }), { status: 400 });
		return new Response(JSON.stringify({ views: 1 }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Redis increment error:", error);
		return new Response(JSON.stringify({ views: 0 }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/views@_@ts
var page = () => views_exports;
//#endregion
export { page };
