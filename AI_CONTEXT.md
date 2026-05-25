# FitWay AI Context

This repository contains the FitWay fitness platform.

Before making architectural or implementation decisions, review:

- brain/core/project-overview.md
- brain/architecture/*
- brain/decisions/*
- brain/bugs/*
- brain/prompts/*
- brain/ideas/*
- brain/backend/*
- brain/frontend/*

# Core Principles

- SEO-first architecture
- Prefer ISR over SSR whenever possible
- Keep frontend highly performant
- Avoid overengineering
- Use reusable components
- Backend CMS is Strapi 5
- Frontend uses Next.js App Router

# Important Notes

- Workout content is generated partially with AI
- Rich text from Strapi may require custom rendering
- Production deploy uses PM2 + Nginx
- Rebuild Strapi admin after schema changes
