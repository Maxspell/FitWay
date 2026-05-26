// import type { Core } from '@strapi/strapi';
import path from 'path';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    // Run the workout importer only when IMPORT_WORKOUTS=true is set.
    // Example: $env:IMPORT_WORKOUTS="true"; npm run start
    if (process.env.IMPORT_WORKOUTS === 'true') {
      // __dirname at runtime = dist/src/ → ../../scripts = backend/scripts/
      const scriptPath = path.join(__dirname, '../../scripts/import-workouts');
      const importWorkouts = require(scriptPath);
      await importWorkouts();
      // Unset so subsequent hot-reloads don't re-import
      delete process.env.IMPORT_WORKOUTS;
    }

    // Run the post importer only when IMPORT_POSTS=true is set.
    if (process.env.IMPORT_POSTS === 'true') {
      const scriptPath = path.join(__dirname, '../../scripts/import-posts');
      const importPosts = require(scriptPath);
      await importPosts();
      delete process.env.IMPORT_POSTS;
    }
  },
};

