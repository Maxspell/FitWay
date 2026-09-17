# Markdown Content Rendering & GFM Tables

## Context & Purpose
The blog articles on FitWay (`/blog/[slug]`) store article bodies as raw Markdown in Strapi CMS, rendered in the Next.js frontend via `react-markdown`.
By default, the CommonMark standard implemented in `react-markdown` does not parse GitHub Flavored Markdown (GFM) extensions such as tables (`| col | col |`), strikethroughs (`~~text~~`), task lists (`[ ]`), and autolinks. Without GFM support, raw Markdown tables are rendered as unformatted plaintext strings.

## Solution
Installed and enabled `remark-gfm` as a remark plugin inside `ReactMarkdown`.

### Implementation Details
1. **Package Installation**:
   ```bash
   npm install remark-gfm
   ```
   Installed in `frontend/package.json` (`remark-gfm@^4.0.1` compatible with `react-markdown@^9.1.0`).

2. **Renderer Integration (`src/app/blog/[slug]/page.tsx`)**:
   ```tsx
   import ReactMarkdown from "react-markdown";
   import remarkGfm from "remark-gfm";

   <div className="card prose prose-invert prose-orange max-w-none">
     <ReactMarkdown
       remarkPlugins={[remarkGfm]}
       components={{
         h2: ({ node, ...props }) => {
           const text = React.Children.toArray(props.children).reduce(flatten, "");
           const id = slugify(text);
           return <h2 id={id} {...props} />;
         },
         h3: ({ node, ...props }) => {
           const text = React.Children.toArray(props.children).reduce(flatten, "");
           const id = slugify(text);
           return <h3 id={id} {...props} />;
         }
       }}
     >
       {post.content}
     </ReactMarkdown>
   </div>
   ```

3. **Styling**:
   The existing parent container uses `@tailwindcss/typography` with classes `prose prose-invert prose-orange max-w-none`.
   Tailwind Typography provides native dark-mode styling for GFM table elements (`table`, `thead`, `tbody`, `tr`, `th`, `td`), borders, and alignments out-of-the-box without requiring custom CSS rules.

## Verification
- Executed `npm run build` in `frontend` - compilation succeeded with status code 0 (TypeScript & Next.js chunk validation passed).

## Related:
- [[frontend/blog-ui]] — Blog page layout, typography, and detail view structure.
- [[frontend/table-of_contents]] — Table of contents parsing heading IDs from `ReactMarkdown`.
- [[frontend/seo]] — Content depth, E-E-A-T signals, and readability.
