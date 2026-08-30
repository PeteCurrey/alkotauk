import fs from 'fs';
import path from 'path';

async function fetchPage(pageNumber) {
  const url = pageNumber === 1 
    ? 'https://alkota.com/resources/blog/' 
    : `https://alkota.com/resources/blog/page/${pageNumber}/`;
  
  console.log(`Fetching page ${pageNumber}: ${url}...`);
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });
    if (!res.ok) {
      console.log(`Page ${pageNumber} returned status ${res.status}`);
      return null;
    }
    const html = await res.text();
    return html;
  } catch (err) {
    console.error(`Error fetching page ${pageNumber}:`, err.message);
    return null;
  }
}

function parseArticlesFromHtml(html) {
  const articles = [];
  // Regex to extract article links and headlines from elementor/wordpress blog loop
  // Look for hrefs matching https://alkota.com/resources/blog/[slug]/ or /blog/[slug]/
  const articleRegex = /<h[23][^>]*>\s*<a\s+href="(https:\/\/alkota\.com\/resources\/blog\/([^"/]+)\/?)"[^>]*>(.*?)<\/a>\s*<\/h[23]>/gi;
  let match;
  while ((match = articleRegex.exec(html)) !== null) {
    const fullUrl = match[1];
    const slug = match[2];
    const rawTitle = match[3].replace(/<[^>]+>/g, '').trim();
    if (slug && !['page', 'category', 'tag'].includes(slug)) {
      articles.push({
        url: fullUrl,
        slug,
        title: rawTitle,
      });
    }
  }
  return articles;
}

async function run() {
  const allDiscovered = new Map();
  let page = 1;
  let hasMore = true;

  while (hasMore && page <= 15) {
    const html = await fetchPage(page);
    if (!html) break;

    const pageArticles = parseArticlesFromHtml(html);
    console.log(`Page ${page} found ${pageArticles.length} articles.`);
    
    if (pageArticles.length === 0) {
      hasMore = false;
      break;
    }

    let newCount = 0;
    for (const art of pageArticles) {
      if (!allDiscovered.has(art.slug)) {
        allDiscovered.set(art.slug, art);
        newCount++;
      }
    }

    if (newCount === 0) {
      hasMore = false;
    }
    page++;
    await new Promise(r => setTimeout(r, 400));
  }

  const results = Array.from(allDiscovered.values());
  console.log(`\nTotal unique articles discovered: ${results.length}`);
  
  const outputPath = path.join(process.cwd(), 'scripts/data/discovered-gcn-urls.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`Saved to ${outputPath}`);
}

run();
