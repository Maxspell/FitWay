# Strapi Content Types

This file documents the core content types and their configurations in the FitWay project.

## Core Collections
- **Workout**: Professional fitness programs.
- **Review**: User reviews for workouts.
- **Author**: Expert profiles.
- **Post**: Blog articles.
- **Category**: Content categorization.

## Known Issues & Fixes
- **Reviews Filtering**: Encountered `400 Bad Request` when filtering reviews by workout. Fixed by enabling Public permissions for the Workout model. See [[brain/bugs/strapi-reviews-400.md]].
