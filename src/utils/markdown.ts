export function parseContent(content: string) {
  let html = content || '';
  
  // Handle markdown images: ![alt](url)
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md my-8 max-h-96 object-cover mx-auto" />');
  
  // Handle headers
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-2xl font-bold text-slate-900 dark:text-white mt-10 mb-5 pb-2 border-b border-slate-200 dark:border-slate-800">$1</h2>');
  
  // Handle bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
  
  // Handle italic text
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Handle lists
  const lines = html.split('\n');
  let inList = false;
  let listType = ''; // 'ul' or 'ol'
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('- ') || (line.startsWith('* ') && !line.includes('**'))) {
      const text = line.substring(2);
      if (!inList) {
        lines[i] = '<ul class="list-disc pl-6 my-5 space-y-2">\n<li>' + text + '</li>';
        inList = true;
        listType = 'ul';
      } else {
        lines[i] = '<li>' + text + '</li>';
      }
    } else if (/^\d+\.\s+/.test(line)) {
      const match = line.match(/^\d+\.\s+(.+)$/);
      const text = match ? match[1] : '';
      if (!inList) {
        lines[i] = '<ol class="list-decimal pl-6 my-5 space-y-2">\n<li>' + text + '</li>';
        inList = true;
        listType = 'ol';
      } else {
        lines[i] = '<li>' + text + '</li>';
      }
    } else {
      if (inList) {
        lines[i-1] = lines[i-1] + `\n</${listType}>`;
        inList = false;
      }
    }
  }
  if (inList) {
    lines[lines.length - 1] = lines[lines.length - 1] + `\n</${listType}>`;
  }
  html = lines.join('\n');
  
  // Paragraph separation
  const paragraphs = html.split(/\n\s*\n/);
  const formatted = paragraphs.map(p => {
    const trimmed = p.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<li') || trimmed.startsWith('<img')) {
      return trimmed;
    }
    return `<p class="mb-4">${trimmed.replace(/\n/g, '<br>')}</p>`;
  });
  
  return formatted.join('\n');
}

export function parseSummary(content: string) {
  let html = content || '';
  
  // Basic inline formatting only
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Strip headers, lists, images to prevent breaking the summary card
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '');
  html = html.replace(/^###\s+(.+)$/gm, '$1');
  html = html.replace(/^##\s+(.+)$/gm, '$1');
  html = html.replace(/^#\s+(.+)$/gm, '$1');
  html = html.replace(/^-\s+(.+)$/gm, '$1');
  
  return html.replace(/\n/g, ' ');
}
