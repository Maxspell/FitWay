# FitWay — Project Overview

## Overview

FitWay is a modern AI-powered fitness platform focused on workout discovery, educational fitness content, and SEO-driven health resources.

The platform combines structured workout data from a headless CMS, rich content pages for education, and interactive fitness tools to provide users with high-quality training programs and health information.

---

# Goals

## Primary Goals

- Build a scalable fitness platform with a decoupled frontend and backend.
- Generate high organic SEO traffic through workout libraries and blog content.
- Create a reusable content architecture for fitness programs.
- Utilize AI-assisted content generation for scaling the content library.
- Maintain superior frontend performance and Core Web Vitals for SEO ranking.

---

# Tech Stack

## Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Caching**: Incremental Static Regeneration (ISR)
- **UI Components**: Lucide React, Swiper

## Backend
- **CMS**: Strapi 5
- **Database**: SQLite (Default/Dev), PostgreSQL, or MySQL
- **API**: REST API

## Infrastructure
- **Hosting**: Ubuntu VPS
- **Web Server**: Nginx
- **Process Management**: PM2
- **CI/CD**: GitHub Actions (SSH-based deployment)
- **SSL**: Let's Encrypt

---

# Architecture

## Frontend Responsibilities
- **SEO Optimization**: Dynamic sitemaps and robots.txt.
- **Content Rendering**: High-performance rendering of Workouts, Blog posts, and FAQs.
- **Interactive Tools**: Client-side fitness calculators (BMI, Calories).
- **Static Generation**: Leveraging ISR to balance freshness and speed.
- **Responsive UI**: Mobile-first design for fitness users.

## Backend Responsibilities
- **Content Management**: Centralized control of workouts, blog articles, and FAQs.
- **API Delivery**: Serving structured JSON data to the Next.js frontend.
- **Media Handling**: Storage and delivery of workout images and videos.
- **Data Import**: Scripted import of AI-generated workout datasets.

---

# Content System

## Main Content Types

### Workouts
Detailed training programs containing:
- Metadata: Title, description, calories, duration, difficulty, category.
- Training Data: Exercises (sets, reps, technique, muscles, tips), target muscle groups, equipment.
- Support: Nutrition advice, SEO fields, and associated media.

### Blog Posts
Educational fitness articles optimized for long-tail SEO keywords.

### FAQ
Structured question-and-answer blocks for improving search snippets and user experience.

### Interactive Tools
Client-side calculators for immediate user utility:
- BMI Calculator
- Calorie Calculator

---

# AI Usage

AI is integrated into the **content pipeline** rather than the runtime:
- **Generation**: Using LLMs to generate structured workout data, SEO-optimized blog posts, and FAQ sets.
- **Structuring**: Transforming raw AI output into JSON formats compatible with Strapi imports.
- **Optimization**: AI-driven keyword research and meta-description generation.

---

# Deployment Workflow

## Pipeline
1. **Push**: Code pushed to `main` branch on GitHub.
2. **Trigger**: GitHub Action triggers the `Deploy` workflow.
3. **SSH**: Action connects to VPS via SSH.
4. **Update**:
   - Fetches latest code and resets to `origin/main`.
   - Detects changed directories (`frontend/` vs `backend/`).
   - Installs dependencies if `package.json` changed.
   - Builds the Next.js frontend.
   - Restarts relevant PM2 processes (`fitway-frontend`, `fitway-backend`).

---

# Caching Strategy

The frontend employs a strict **ISR (Incremental Static Regeneration)** strategy:
- **Revalidation**: Typical window of 1 hour for blog and workout pages.
- **Benefit**: Reduces VPS load by serving static HTML while allowing updates without a full rebuild.
- **SEO**: Ensures lightning-fast Time to First Byte (TTFB).

---

# Known Challenges
- Strapi admin cache synchronization after schema updates.
- Mapping Strapi rich-text blocks to clean HTML/React components.
- Managing environment-specific API tokens across staging and production.

---

# Future Plans
- **Personalization**: AI-generated personalized workout plans based on user goals.
- **User Ecosystem**: Accounts, profile management, and workout progress tracking.
- **Advanced Filtering**: Complex workout discovery (by equipment, time, or muscle group).
- **Cross-Platform**: Dedicated mobile application.
- **Real-time AI**: Integrated AI fitness assistant for real-time form/plan advice.

---

# Development Philosophy
- **SEO-First**: Every feature is weighed against its impact on search visibility.
- **Simplicity**: Avoiding over-engineering in favor of maintainable, standard patterns.
- **Decoupled**: Strict separation between content management (Strapi) and presentation (Next.js).
- **Performance**: Prioritizing Core Web Vitals to ensure a premium user experience.
