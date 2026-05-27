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

## Future Optimization
The goal is to automate this process to reduce friction. Potential directions:
- API-driven imports.
- Automatic triggers upon deployment.
- A dedicated admin UI for content ingestion.
