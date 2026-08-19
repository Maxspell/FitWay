# Strapi v5 Reviews API 400 Bad Request

## Symptom
The frontend receives a `400 Bad Request` when attempting to fetch reviews for a specific workout using a relation filter:
`GET /api/reviews?filters[workout][documentId][$eq]=<documentId>&sort=createdAt:desc`

This issue occurred on the production server while the local environment worked correctly.

## Investigation & Failed Attempts
1. **Relation Type Change**: Tried switching from a bidirectional relation (OneToMany $\leftrightarrow$ ManyToOne) to a unidirectional relation. The error persisted.
2. **Filter Attribute Change**: Tried replacing `documentId` with `id` in the filter (`filters[workout][id][$eq]=...`). This resulted in a `200 OK` with an empty array, but failed to return existing reviews because the identifier types didn't match.
3. **Schema Sync**: Ensured that `schema.json` files on production matched the local version and rebuilt the Strapi admin.

## Root Cause
The root cause was **missing API permissions** for the related content type. 

In Strapi v5, when you filter a collection (e.g., `Reviews`) by a relation to another collection (e.g., `Workout`), the API requires the requesting user/role to have read permissions for **both** collections.

The `Public` role had permissions for `Review` (`find`, `findOne`), but lacked permissions for `Workout` (`find`, `findOne`). This caused the API to reject the request with a `400 Bad Request` instead of a `403 Forbidden` or an empty result.

## Resolution
Enable the following permissions in the Strapi Admin Panel:
**Settings** $\rightarrow$ **Users & Permissions Plugin** $\rightarrow$ **Roles** $\rightarrow$ **Public** $\rightarrow$ **Workout** $\rightarrow$ Check **find** and **findOne**.

## Lessons Learned
- **Relation Dependencies**: API filters on relations in Strapi v5 depend on the permissions of the related model.
- **Debugging 400s**: A `400 Bad Request` in Strapi during relation filtering can be a masked permission issue rather than a syntax error.

## Related
- [[brain/backend/strapi-content-types.md]]
- [[brain/core/stack.md]]
- [[brain/index.md]]
