# Strapi Content Types

This file documents the core content types and their configurations in the FitWay project.

## Core Collections
- **Workout**: Professional fitness programs. Includes components `fitness.exercise`, `fitness.nutrition-tips`, and `fitness.expert-tips` (see [[frontend/workout-expert-tips]]).
- **Review**: User reviews for workouts.
- **Author**: Expert profiles.
- **Post**: Blog articles.
- **Category**: Content categorization.

## Fitness Components
- **`fitness.exercise`**: Exercise details (name, sets, reps, duration, technique, tips, commonMistakes, muscles, media).
- **`fitness.nutrition-tips`**: Fueling guidelines (preWorkout, postWorkout, hydration).
- **`fitness.expert-tips`**: Coaching macro-strategy and common pitfalls for the workout protocol (tips, commonMistakes). See [[frontend/workout-expert-tips]].

## Known Issues & Fixes
- **Reviews Filtering**: Encountered `400 Bad Request` when filtering reviews by workout. Fixed by enabling Public permissions for the Workout model. See [[brain/bugs/strapi-reviews-400.md]].
