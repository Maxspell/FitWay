'use strict';

const workoutsFile = require("./workouts.json");

// Strapi v5: entityService is deprecated, use strapi.documents()
module.exports = async () => {
    // workouts.json has REST API shape: { data: [...], meta: {...} }
    const items = Array.isArray(workoutsFile) ? workoutsFile : workoutsFile.data;

    if (!items || items.length === 0) {
        console.log("No workouts found in workouts.json");
        return;
    }

    console.log(`Importing ${items.length} workout(s)...`);

    for (const item of items) {
        // Strip system fields that Strapi manages automatically
        const {
            id,
            documentId,
            createdAt,
            updatedAt,
            publishedAt,
            image,
            video,
            nutritionAdvice,
            exercises,
            ...rest
        } = item;

        const data = {
            ...rest,
            // Media relations: pass only the numeric id
            ...(image ? { image: image.id } : {}),
            ...(video ? { video: video.id } : {}),
            // Components: strip the internal `id` field added by Strapi
            ...(nutritionAdvice
                ? {
                      nutritionAdvice: (({ id: _id, ...comp }) => comp)(nutritionAdvice),
                  }
                : {}),
            ...(exercises && exercises.length > 0
                ? {
                      exercises: exercises.map(({ id: _id, ...ex }) => ex),
                  }
                : {}),
        };

        try {
            // Create as draft first (Strapi v5 Document Service API)
            const created = await strapi.documents("api::workout.workout").create({ data });

            // Publish immediately (draftAndPublish is enabled on this content-type)
            await strapi.documents("api::workout.workout").publish({
                documentId: created.documentId,
            });

            console.log(`✓ Created & published: "${data.title}" (${created.documentId})`);
        } catch (err) {
            console.error(`✗ Failed to import "${data.title}":`, err.message);
        }
    }

    console.log("Import complete.");
};