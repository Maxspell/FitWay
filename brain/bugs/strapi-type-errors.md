# Strapi Type Errors (TS2345)

## The Problem
When creating a new collection via the filesystem, TypeScript throws errors like:
`Argument of type '"api::collection.collection"' is not assignable to parameter of type 'ContentType'.`

This happens because Strapi's types are generated dynamically at runtime. During the `npm run build` phase, the compiler doesn't yet know about the new collection.

## The Solution
Use a type cast to `any` when passing the collection identifier to `factories`:

```typescript
export default factories.createCoreController('api::collection.collection' as any);
```

This bypasses the static type check and allows the build to proceed. Once the server runs, the real types are generated.

Related: [[strapi-v5-collections]]
