# Blog UI Improvements

## Card Component Evolution
The blog listing page was updated to improve UX and information density.

### Key Changes
- **Full-Card Links**: The entire post card is now wrapped in a `Link` component, making the target area larger and more intuitive.
- **Visual Feedback**: Added `hover:ring-2 hover:ring-[#FF8C00]` to the cards to provide clear interactive cues.
- **Data Display**:
    - Integrated `readTime` for better user expectation management.
    - Switched to `publishedAt` for dates, formatted via `toLocaleDateString` for a more human-readable format.
    - Updated iconography: `Calendar` for date, `Clock` for reading time.

**Related:**
- [[blog-api]] - API changes supporting the data.
- [[ui-system]] - General design patterns used.
