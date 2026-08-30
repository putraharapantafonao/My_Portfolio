const GITHUB_TOKEN = import.meta.env.GITHUB_TOKEN;
const REPO_OWNER = 'putraharapantafonao';
const REPO_NAME = 'My_Portfolio';
const BRANCH = 'main';

export async function getGithubFileSha(path: string): Promise<string | null> {
  if (!GITHUB_TOKEN) return null;
  
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}?ref=${BRANCH}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.sha;
  } catch (error) {
    console.error('Error fetching file SHA from GitHub:', error);
    return null;
  }
}

export async function uploadToGithub(path: string, content: string, message: string, isBase64 = false) {
  if (!GITHUB_TOKEN) {
    console.warn('GITHUB_TOKEN is not set. Skipping GitHub upload.');
    return false;
  }

  try {
    const sha = await getGithubFileSha(path);
    const base64Content = isBase64 ? content : Buffer.from(content).toString('base64');

    const body: any = {
      message: message,
      content: base64Content,
      branch: BRANCH
    };

    if (sha) {
      body.sha = sha; // Required for updating existing files
    }

    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('GitHub API Error:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to push to GitHub:', error);
    return false;
  }
}
