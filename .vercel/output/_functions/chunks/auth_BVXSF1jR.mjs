import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import "./auth_DF63lbJH.mjs";
//#region src/pages/api/auth.ts
var auth_exports = /* @__PURE__ */ __exportAll({
	DELETE: () => DELETE,
	POST: () => POST
});
var POST = async ({ request, cookies }) => {
	try {
		const { passcode } = await request.json();
		if (passcode === "@Putra714") {
			cookies.set("admin_token", passcode, {
				path: "/",
				httpOnly: true,
				secure: false,
				sameSite: "strict",
				maxAge: 3600 * 24 * 7
			});
			return new Response(JSON.stringify({ success: true }), { status: 200 });
		}
		return new Response(JSON.stringify({ error: "Passcode salah!" }), { status: 401 });
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
var DELETE = async ({ cookies }) => {
	cookies.delete("admin_token", { path: "/" });
	return new Response(JSON.stringify({ success: true }), { status: 200 });
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/auth@_@ts
var page = () => auth_exports;
//#endregion
export { page };
