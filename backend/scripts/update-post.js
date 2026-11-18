const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.resolve(__dirname, '../../frontend/.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        let key = match[1];
        let value = match[2] ? match[2].trim() : '';
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (!process.env[key]) process.env[key] = value;
      }
    }
  }
}

loadEnv();

async function main() {
  const args = process.argv.slice(2);
  const isProd = args.includes('--prod');
  const fileArgs = args.filter(a => !a.startsWith('--'));
  const filePath = fileArgs[0];

  if (!filePath || !fs.existsSync(filePath)) {
    console.error(`❌ Error: JSON file not found at path: ${filePath}`);
    process.exit(1);
  }

  const payload = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const baseUrl = isProd ? 'https://api.fitway.best' : (process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337');
  const apiToken = isProd ? process.env.STRAPI_PROD_API_TOKEN : process.env.STRAPI_API_TOKEN;

  let documentId = payload.documentId;
  if (!documentId && payload.slug) {
    const searchUrl = `${baseUrl}/api/posts?filters[slug][$eq]=${encodeURIComponent(payload.slug)}`;
    const searchRes = await fetch(searchUrl, {
      headers: { 'Authorization': `Bearer ${apiToken}` }
    });
    const searchData = await searchRes.json();
    if (searchData.data && searchData.data[0]) {
      documentId = searchData.data[0].documentId;
    }
  }

  if (!documentId) {
    console.error(`❌ Error: Could not determine documentId for post slug: "${payload.slug}"`);
    process.exit(1);
  }

  console.log(`\n🚀 [Update Post] Target: ${baseUrl} (${isProd ? 'PRODUCTION' : 'LOCAL'})`);
  console.log(`📄 DocumentID: ${documentId} | Title: "${payload.title}"`);

  // Strip read-only or meta fields
  const {
    id,
    documentId: _dId,
    createdAt,
    updatedAt,
    publishedAt,
    image,
    author,
    reviewedBy,
    category,
    ...fieldsToUpdate
  } = payload;

  const endpoint = `${baseUrl}/api/posts/${documentId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiToken}`
      },
      body: JSON.stringify({ data: fieldsToUpdate })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error(`❌ [HTTP ${response.status}] Failed to update "${payload.title}":`, result.error || result);
      process.exit(1);
    }

    const postData = result.data;
    console.log(`✓ [SUCCESS] Updated "${postData?.title}" (ID: ${postData?.id}, DocumentID: ${postData?.documentId})`);
    console.log(`  PublishedAt: ${postData?.publishedAt || 'DRAFT'}`);
  } catch (err) {
    console.error(`❌ Network error while updating "${payload.title}":`, err.message);
    process.exit(1);
  }
}

main();
