# Strapi v5 Collections

## Manual Collection Creation via Code
In Strapi v5, creating a collection type manually via the filesystem requires the following structure in `src/api/[collection-name]/`:

- `content-types/[collection-name]/schema.json`: Defines the data model.
- `controllers/[collection-name].ts`: `factories.createCoreController('api::[collection-name].[collection-name]')`
- `routes/[collection-name].ts`: `factories.createCoreRouter('api::[collection-name].[collection-name]')`
- `services/[collection-name].ts`: `factories.createCoreService('api::[collection-name].[collection-name]')`

## API Token Permissions
Adding a new collection via code does NOT automatically grant permissions to existing API Tokens. 

**Fix for 403 Forbidden:**
1. Go to **Settings** $\rightarrow$ **API Tokens**.
2. Edit the relevant token.
3. Manually check the `create` (and other needed) permissions for the new collection.
4. Save changes.

See also: [[strapi-type-errors]]
