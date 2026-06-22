# Strapi Type Errors (TS2345)

## The Problem
When creating a new collection via the filesystem, TypeScript throws errors like:
`Argument of type '"api::collection.collection"' is not assignable to parameter of type 'ContentType'.`

This happens because Strapi's types are generated dynamically at runtime. During the `npm run build` phase, the compiler doesn't yet know about the new collection.

## The Solution
Strapi 5 uses strong typing. The proper fix is to generate the TypeScript definitions before building:

```bash
npx strapi ts:generate-types
npm run build
```

This updates `types/generated/contentTypes.d.ts` so the compiler recognizes the new collection.

*(Old workaround: Use a type cast to `any` when passing the collection identifier to `factories` e.g., `'api::collection.collection' as any`)*

Related: [[strapi-v5-collections]]
