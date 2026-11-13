# Markdown Content Rendering & GFM Tables

## Context & Purpose
The blog articles on FitWay (`/blog/[slug]`) store article bodies as raw Markdown in Strapi CMS, rendered in the Next.js frontend via `react-markdown`.
By default, the CommonMark standard implemented in `react-markdown` does not parse GitHub Flavored Markdown (GFM) extensions such as tables (`| col | col |`), strikethroughs (`~~text~~`), task lists (`[ ]`), and autolinks. Without GFM support, raw Markdown tables are rendered as unformatted plaintext strings.

## Solution
Installed and enabled `remark-gfm` as a remark plugin inside `ReactMarkdown`, combined with dedicated responsive table wrapping and custom horizontal scroll styling.

### Implementation Details
1. **Package Installation**:
   ```bash
   npm install remark-gfm
   ```
   Installed in `frontend/package.json` (`remark-gfm@^4.0.1` compatible with `react-markdown@^9.1.0`).

2. **Mobile Responsive Wrapper & Custom Components (`src/app/blog/[slug]/page.tsx`)**:
   Standard HTML `<table>` elements with multiple columns will naturally exceed mobile screen widths (~360px), which previously caused the entire webpage to blow out and display a window-level horizontal scrollbar.
   
   To solve this without clipping table contents:
   - Added `min-w-0` to the parent column layout (`lg:col-span-8 min-w-0`) to stop CSS grid blowout.
   - Wrapped `table` in a dedicated `overflow-hidden rounded-xl border border-white/10` with an inner `overflow-x-auto`.
   - Set table `min-w-[520px]` with neat cell padding and zebra hover styling (`th`, `td`, `tr`, `thead`).
   - Styled the horizontal scrollbar in `globals.css` (`.overflow-x-auto::-webkit-scrollbar`) with brand colors (`#FF8C00`).

   ```tsx
   table: ({ node, children, ...props }) => (
     <div className="my-6 w-full overflow-hidden rounded-xl border border-white/10 bg-[#1A2634]/60 shadow-md">
       <div className="overflow-x-auto">
         <table className="w-full min-w-[520px] border-collapse text-left text-xs sm:text-sm" {...props}>
           {children}
         </table>
       </div>
     </div>
   ),
   ```

3. **Styling & Container Padding**:
   - Updated `.card` in `globals.css` from rigid `p-8 rounded-[32px]` to responsive `p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl md:rounded-[32px]`.
   - In `page.tsx`, the card container uses `p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl break-words` to maximize available mobile reading width while preserving clean margins.
   - Customized `ul`, `ol`, and `li` components in `ReactMarkdown` with `pl-5 sm:pl-6` to avoid the excessive ~26px default indentation that squashed list text on mobile viewports.

## Verification
- Executed `npm run build` in `frontend` - compilation succeeded with status code 0 (TypeScript & Next.js chunk validation passed).

## Related:
- [[frontend/external-links-eeat]] — Custom link handling in `ReactMarkdown`, tab security, and E-E-A-T citing rules.
- [[frontend/blog-ui]] — Blog page layout, typography, and detail view structure.
- [[frontend/table-of_contents]] — Table of contents parsing heading IDs from `ReactMarkdown`.
- [[frontend/seo]] — Content depth, E-E-A-T signals, and readability.
