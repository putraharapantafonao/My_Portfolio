//#region src/utils/github.ts
async function uploadToGithub(path, content, message, isBase64 = false) {
	console.warn("GITHUB_TOKEN is not set. Skipping GitHub upload.");
	return false;
}
//#endregion
export { uploadToGithub as t };
