import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { n as isAuthenticated } from "./auth_DF63lbJH.mjs";
import { t as uploadToGithub } from "./github_BsHlmNJn.mjs";
import fs from "node:fs";
import nodePath from "node:path";
//#region src/pages/api/upload-assets.ts
var upload_assets_exports = /* @__PURE__ */ __exportAll({ POST: () => POST });
/**
* Helper to save an uploaded file to the public directory.
* Returns the public URL (e.g. "/project-image-169...png").
*/
async function saveFile(file, allowedExts, prefix) {
	const ext = nodePath.extname(file.name).toLowerCase();
	if (!allowedExts.includes(ext)) throw new Error(`Format ${prefix} tidak valid. Diperbolehkan: ${allowedExts.join(", ")}`);
	const fileName = `${prefix}-${Date.now()}${ext}`;
	const publicDir = nodePath.resolve("public");
	const destPath = nodePath.join(publicDir, fileName);
	const buffer = Buffer.from(await file.arrayBuffer());
	try {
		try {
			fs.writeFileSync(destPath, buffer);
		} catch (e) {}
	} catch (e) {}
	await uploadToGithub(`public/${fileName}`, buffer.toString("base64"), `Upload ${fileName}`, true);
	return `/${fileName}`;
}
/**
* Delete a previously stored image if it matches the given prefix pattern.
*/
function deleteOldImage(oldUrl, prefix) {
	if (!oldUrl) return;
	if (!oldUrl.startsWith(`/${prefix}-`)) return;
	const publicDir = nodePath.resolve("public");
	const oldPath = nodePath.join(publicDir, oldUrl.substring(1));
	if (fs.existsSync(oldPath)) try {
		fs.unlinkSync(oldPath);
	} catch (_) {}
}
var POST = async ({ request, cookies }) => {
	if (!isAuthenticated(cookies)) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
	try {
		const formData = await request.formData();
		const faviconFile = formData.get("favicon");
		const ogImageFile = formData.get("ogImage");
		const profileImageFile = formData.get("profileImage");
		const projectImageFile = formData.get("projectImage");
		const projectId = formData.get("projectId");
		const blogImageFile = formData.get("blogImage");
		const blogId = formData.get("blogId");
		const certificateImageFile = formData.get("certificateImage");
		const certificateId = formData.get("certificateId");
		const publicationImageFile = formData.get("publicationImage");
		const publicationId = formData.get("publicationId");
		const skillImageFile = formData.get("skillImage");
		const skillId = formData.get("skillId");
		const educationImageFile = formData.get("educationImage");
		const educationId = formData.get("educationId");
		const editorImageFile = formData.get("editorImage");
		if (!faviconFile && !ogImageFile && !profileImageFile && !projectImageFile && !blogImageFile && !certificateImageFile && !publicationImageFile && !skillImageFile && !educationImageFile && !editorImageFile) return new Response(JSON.stringify({ error: "Tidak ada berkas yang diunggah" }), { status: 400 });
		const profilePath = nodePath.resolve("src/data/profile.json");
		const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
		const responseData = { success: true };
		if (faviconFile) {
			const url = await saveFile(faviconFile, [
				".ico",
				".png",
				".jpg",
				".jpeg",
				".svg",
				".gif"
			], "favicon");
			deleteOldImage(profile.faviconUrl, "favicon");
			profile.faviconUrl = url;
			responseData.faviconUrl = url;
		}
		if (ogImageFile) {
			const url = await saveFile(ogImageFile, [
				".png",
				".jpg",
				".jpeg",
				".webp"
			], "og-image");
			deleteOldImage(profile.ogImageUrl, "og-image");
			profile.ogImageUrl = url;
			responseData.ogImageUrl = url;
		}
		if (profileImageFile) {
			const url = await saveFile(profileImageFile, [
				".png",
				".jpg",
				".jpeg",
				".webp",
				".gif"
			], "profile-photo");
			deleteOldImage(profile.profileImage, "profile-photo");
			profile.profileImage = url;
			responseData.profileImage = url;
		}
		const updateJsonArray = async (filePath, id, imageUrl, prefix, responseKey) => {
			if (!id) return;
			const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
			const idx = data.findIndex((item) => item.id === id);
			if (idx === -1) return;
			const oldImg = data[idx].image;
			data[idx].image = imageUrl;
			deleteOldImage(oldImg, prefix);
			try {
				fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
			} catch (e) {}
			await uploadToGithub(`src/data/${nodePath.basename(filePath)}`, JSON.stringify(data, null, 2), `Update ${nodePath.basename(filePath)} with new image`);
			responseData[responseKey] = imageUrl;
		};
		if (projectImageFile && projectId) await updateJsonArray(nodePath.resolve("src/data/projects.json"), projectId, await saveFile(projectImageFile, [
			".png",
			".jpg",
			".jpeg",
			".webp",
			".gif"
		], "project-image"), "project-image", "projectImageUrl");
		if (blogImageFile && blogId) await updateJsonArray(nodePath.resolve("src/data/blogs.json"), blogId, await saveFile(blogImageFile, [
			".png",
			".jpg",
			".jpeg",
			".webp",
			".gif"
		], "blog-image"), "blog-image", "blogImageUrl");
		if (certificateImageFile && certificateId) await updateJsonArray(nodePath.resolve("src/data/certificates.json"), certificateId, await saveFile(certificateImageFile, [
			".png",
			".jpg",
			".jpeg",
			".webp",
			".gif"
		], "certificate-image"), "certificate-image", "certificateImageUrl");
		if (publicationImageFile && publicationId) await updateJsonArray(nodePath.resolve("src/data/publications.json"), publicationId, await saveFile(publicationImageFile, [
			".png",
			".jpg",
			".jpeg",
			".webp",
			".gif"
		], "publication-image"), "publication-image", "publicationImageUrl");
		if (skillImageFile && skillId) await updateJsonArray(nodePath.resolve("src/data/skills.json"), skillId, await saveFile(skillImageFile, [
			".png",
			".jpg",
			".jpeg",
			".webp",
			".gif"
		], "skill-image"), "skill-image", "skillImageUrl");
		if (educationImageFile && educationId) {
			const educationPath = nodePath.resolve("src/data/education.json");
			const data = JSON.parse(fs.readFileSync(educationPath, "utf-8"));
			const idx = data.findIndex((item) => item.id === educationId);
			if (idx !== -1) {
				const url = await saveFile(educationImageFile, [
					".png",
					".jpg",
					".jpeg",
					".webp",
					".gif",
					".svg"
				], "education-logo");
				const oldImg = data[idx].logo;
				data[idx].logo = url;
				deleteOldImage(oldImg, "education-logo");
				try {
					fs.writeFileSync(educationPath, JSON.stringify(data, null, 2), "utf-8");
				} catch (e) {}
				await uploadToGithub("src/data/education.json", JSON.stringify(data, null, 2), "Update education logo");
				responseData.educationImageUrl = url;
			}
		}
		try {
			fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), "utf-8");
		} catch (e) {}
		if (faviconFile || ogImageFile || profileImageFile) await uploadToGithub("src/data/profile.json", JSON.stringify(profile, null, 2), "Update profile images");
		return new Response(JSON.stringify(responseData), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), { status: 500 });
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload-assets@_@ts
var page = () => upload_assets_exports;
//#endregion
export { page };
