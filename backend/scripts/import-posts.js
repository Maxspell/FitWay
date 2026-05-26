'use strict';

const postsFile = require("./posts.json");

// Strapi v5: entityService is deprecated, use strapi.documents()
module.exports = async () => {
    // posts.json has REST API shape: { data: [...], meta: {...} }
    const items = Array.isArray(postsFile) ? postsFile : postsFile.data;

    if (!items || items.length === 0) {
        console.log("No posts found in posts.json");
        return;
    }

    console.log(`Importing ${items.length} post(s)...`);

    for (const item of items) {
        // Strip system fields that Strapi manages automatically
        const {
            id,
            documentId,
            createdAt,
            updatedAt,
            publishedAt,
            image,
            ...rest
        } = item;

        const data = {
            ...rest,
            // Media relations: pass only the numeric id
            ...(image ? { image: image.id } : {}),
        };

        try {
            // Create as draft first (Strapi v5 Document Service API)
            const created = await strapi.documents("api::post.post").create({ data });

            // Publish immediately (draftAndPublish is enabled on this content-type)
            await strapi.documents("api::post.post").publish({
                documentId: created.documentId,
            });

            console.log(`✓ Created & published: "${data.title}" (${created.documentId})`);
        } catch (err) {
            console.error(`✗ Failed to import "${data.title}":`, err.message);
        }
    }

    console.log("Import complete.");
};
