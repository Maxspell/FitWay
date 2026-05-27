# Blog API Integration

## Sorting Strategy
Previously, blog posts were sorted on the client-side. This was changed to server-side sorting to improve performance and ensure consistency.

**Implementation:**
The API request now includes the `sort` parameter:
`?populate=image&sort=publishedAt:desc`

**Why:**
- Reduces frontend processing.
- Leverages database indexing for faster retrieval.
- Ensures the "Latest" articles are always first regardless of client implementation.

**Related:**
- [[blog-ui]] - How this data is displayed.
- [[strapi-schema]] - Data structure of the Posts content type.
