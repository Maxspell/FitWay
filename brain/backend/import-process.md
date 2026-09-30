# Content Import Process

## Current Workflow
The current method for importing workouts and articles is manual and involves several steps:

1. **Data Entry**: Enter data into a JSON file.
2. **Version Control**: Commit and push the JSON file to Git.
3. **Deployment**: CI/CD pipeline deploys the changes to the server.
4. **Manual Trigger**: Execute commands directly on the server to trigger the import.
   - Workouts: `IMPORT_WORKOUTS=true npm run start`
   - Posts: `IMPORT_POSTS=true npm run start`

## Pain Points
- **Inconvenience**: High friction between data entry and actual availability on the site.
- **Manual Intervention**: Requires SSH access and manual command execution on the VPS.
- **Fragility**: The process relies on environment variables and specific start-up triggers.

## API-Driven Direct Import (New & Recommended)
Instead of committing JSON files and executing commands on the server via SSH, import posts directly from your local terminal using the REST API:

```bash
# Push Posts:
node backend/scripts/push-post.js path/to/post.json --prod
node backend/scripts/push-post.js path/to/post.json --prod --publish

# Push Workouts:
node backend/scripts/push-workout.js path/to/workout.json --prod
node backend/scripts/push-workout.js path/to/workout.json --prod --publish
```

### Requirements:
- The API token configured in `frontend/.env.local` (`STRAPI_PROD_API_TOKEN` / `STRAPI_API_TOKEN`) must have `create` permissions for `Post` and `Workout` in Strapi Admin:
  1. Open Strapi Admin (`Settings` -> `API Tokens`).
  2. Select your API token.
  3. Under `Post` and `Workout`, check `create` (and `publish` if using `--publish`).
  4. Save.
- No git commit or SSH is required.

