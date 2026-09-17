# External Link Handling & E-E-A-T Sourcing (ReactMarkdown)

## Context & Purpose
In health, fitness, and nutrition content (YMYL topics), referencing authoritative primary scientific sources (such as NCBI/PubMed, ISSN, WHO, academic journals) is a core requirement for Google E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) and AdSense quality compliance.

Authors write articles in Strapi CMS using standard Markdown links:
```markdown
[**20-40g of protein**](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5477153/)
```

By default, standard `ReactMarkdown` renders `[text](url)` as a simple `<a href="...">` tag:
- It navigated away from the FitWay website in the same browser tab, degrading user retention.
- Missing `rel="noopener noreferrer"` exposed users to tabnabbing security vulnerabilities.
- It lacked distinction between internal platform routes (which should use Next.js client-side navigation `<Link>`) and external outgoing references.

## Technical Implementation

In `src/app/blog/[slug]/page.tsx`, the `ReactMarkdown` components configuration was extended with a custom `a` tag renderer:

```tsx
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
    },
    a: ({ node, href, children, ...props }) => {
      const isExternal = href?.startsWith("http://") || href?.startsWith("https://");
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href || "#"} {...props}>
          {children}
        </Link>
      );
    }
  }}
>
  {post.content}
</ReactMarkdown>
```

### Behavior:
1. **External URLs (`http://` or `https://`)**:
   - Rendered as `<a target="_blank" rel="noopener noreferrer">`.
   - Opens in a new tab, keeping the reader on the FitWay article.
   - Prevents access to `window.opener` (`noopener`) and suppresses the `Referer` header (`noreferrer`).
2. **Internal URLs (relative links, `/workouts`, `#anchors`)**:
   - Rendered as Next.js `<Link href="...">` to preserve fast client-side SPA routing and prefetching.

---

## SEO & Web Standards: The `dofollow` vs `nofollow` Rule

A common misconception in SEO is attempting to write `rel="dofollow"`.

| Attribute Value | W3C / HTML Standard | Search Engine Interpretation | When to Use |
| :--- | :--- | :--- | :--- |
| *(no rel or nofollow)* | ✅ Standard default | **Follow / Dofollow**: Crawlers pass PageRank and index citations. | **Authoritative citations** (PubMed, NCBI, WHO, research papers). |
| `rel="dofollow"` | ❌ Non-existent | Ignored by crawlers (treated as default follow), fails W3C validators. | **Never use** (invalid HTML attribute). |
| `rel="noopener noreferrer"` | ✅ Standard security | **Follow**: Crawlers still follow the link; doesn't affect PageRank. | **All external links opening in new tab (`target="_blank"`)**. |
| `rel="nofollow"` | ✅ Standard hint | Instructs search engines not to endorse or pass link equity. | Untrusted user links, low-reputation sites. |
| `rel="sponsored"` | ✅ Standard hint | Identifies paid, affiliate, or sponsored partner links. | Affiliate marketing, paid promotions. |
| `rel="ugc"` | ✅ Standard hint | User-Generated Content. | Comments, forum posts, user submissions. |

### E-E-A-T Impact for FitWay:
- Outgoing links to medical/scientific authorities should **remain standard follow** (omitting `nofollow`).
- Linking to high-authority peer-reviewed research (NCBI, PubMed) signals to Google algorithms that claims are supported by legitimate science, directly strengthening YMYL ratings and supporting [[roadmap/adsense-approval-plan]].

## Verification
- Executed `npm run build` in `frontend`: compiled successfully with exit code 0 (`tsc` + Next.js build artifacts verified).

## Related:
- [[frontend/markdown-tables-gfm]] — GFM Markdown formatting and rendering in blog posts.
- [[frontend/seo]] — FitWay platform SEO architecture and E-E-A-T standards.
- [[frontend/editorial-policy]] — Editorial policy, peer review, and scientific sourcing standards.
- [[frontend/blog-ui]] — Blog article page layout and components.
- [[roadmap/adsense-approval-plan]] — Low-value content mitigation and quality guidelines.
