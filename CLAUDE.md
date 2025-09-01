# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Build and Development:**
- `pnpm dev` - Start development server
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint checks

**Package Manager:**
- This project uses `pnpm` (not npm or yarn)
- Dependencies are locked in `pnpm-lock.yaml`

## Architecture Overview

**Framework Stack:**
- Next.js 15+ with React 18.3
- Nextra 3.3+ for documentation site generation
- TypeScript with relaxed strict mode (`"strict": false`)
- Tailwind CSS for styling with Ant Design components
- Custom fonts (Campton) loaded via `next/font/local`

**Content Architecture:**
- **Pages**: MDX files in `pages/` directory organized by topic (staking, dapps, gaming, etc.)
- **Data**: JSON files in `data/` (builders.json, wallets.json) for structured content
- **Components**: React components in `components/` for tables and UI elements
- **Assets**: SVG icons/logos in `assets/` with custom webpack SVG handling
- **Theming**: Centralized theme configuration in `theme.config.tsx`

**Key Directories:**
- `pages/` - MDX content files organized by Cardano ecosystem categories
- `components/` - Reusable React components (tables, badges, UI elements)
- `data/` - JSON data files for dynamic content
- `assets/` - Icons, logos, fonts with custom webpack processing
- `scripts/` - Build and utility scripts
- `css/` - Global styles and Tailwind configuration

**Content Management:**
- Content is primarily in MDX format allowing React components within Markdown
- Structured data in JSON format (builders, wallets) rendered via custom table components
- Navigation and metadata controlled by `_meta.js` files in each directory
- SEO handled through frontmatter in MDX files and theme configuration

**Routing & Redirects:**
- Extensive redirect configuration in `next.config.mjs` for URL migration
- Pages organized hierarchically matching Cardano ecosystem structure
- All pages redirect to `/all_pages#section` for main navigation

**Custom Features:**
- GitHub integration via Octokit for dynamic repository data
- Custom SVG handling for assets/icons and assets/logos directories
- Theme-aware logo switching (dark/light modes)
- Custom component registration in Nextra theme config (OS badges)

## Development Guidelines

**Component Patterns:**
- Use TypeScript path alias `@components/*` for component imports
- Follow existing component structure in `components/tables/` for data presentation
- Custom components must be registered in `theme.config.tsx` components section

**Content Development:**
- MDX files support frontmatter for `seo_title` and `seo_description`
- Use existing JSON data patterns in `data/` directory for structured content
- Follow existing redirect patterns when changing URLs (add to `next.config.mjs`)

**Styling:**
- Tailwind CSS is primary styling method
- Ant Design components available with custom theme provider
- Custom CSS in `css/styles.css` for global overrides
- Theme switching supported (light/dark/system modes)

**GitHub Integration:**
- GITHUB_ACCESS_TOKEN environment variable required for API calls
- Octokit configured with retry and throttling plugins for API resilience