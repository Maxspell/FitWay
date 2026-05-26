# FitWay AI Context

This repository contains the FitWay fitness platform.

Before making architectural or implementation decisions, review:

- brain/core/project-overview.md
- brain/architecture/*
- brain/decisions/*
- brain/bugs/*
- brain/prompts/*

# Core Principles

- SEO-first architecture
- Prefer ISR over SSR whenever possible
- Keep frontend highly performant
- Avoid overengineering
- Use reusable components
- Backend CMS is Strapi 5
- Frontend uses Next.js App Router

# Important Notes

- Workout content is partially AI-generated
- Rich text from Strapi may require custom rendering
- Production deploy uses PM2 + Nginx
- Rebuild Strapi admin after schema changes

# Knowledge Base Rules

The /brain directory is a long-term engineering memory system.

When updating it:

- prefer updating existing notes instead of creating new files
- avoid duplicates
- document reusable knowledge only
- keep notes concise
- use semantic filenames
- focus on architecture and debugging knowledge
- do NOT document trivial code changes
- prefer atomic notes over huge documents