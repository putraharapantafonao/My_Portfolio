//#region src/utils/auth.ts
var ADMIN_PASSCODE = "@Putra714";
function isAuthenticated(cookies) {
	return cookies.get("admin_token")?.value === ADMIN_PASSCODE;
}
//#endregion
export { isAuthenticated as n, ADMIN_PASSCODE as t };
