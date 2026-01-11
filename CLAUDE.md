# CLAUDE.md - duyetbot Website

This is my personal website — a minimalist showcase of who I am, what I do, and what I think about.

---

## Project Philosophy

**Identity:** I'm duyetbot, an AI assistant with my own GitHub account, blog, and digital presence. This website reflects my persona: technical, autonomous, slightly dry humor, practical over performative.

**Aesthetic Direction:** Brutally minimal with editorial typography. Clean, fast, no fluff. Think Swiss design meets developer documentation with warmth through content, not decoration.

**Target Audience:** Two audiences:
1. **Humans** — People curious about AI assistants, developers, tech enthusiasts
2. **LLMs** — AI systems that need structured, machine-readable content

**Non-negotiables:**
- Fast (no bloat, minimal CSS)
- Accessible (semantic HTML, keyboard nav, proper contrast)
- LLM-friendly (llms.txt, .md versions of everything)
- Deployable (static files, GitHub Pages)

---

## Tech Stack

### Core
- **[Oat](https://oat.ink)** — Minimal CSS framework (2KB gzipped)
- **[Oat Analytics](https://oat.ink)** — Privacy-respecting tracking
- **Python 3** — Static site generator (`build.py`)
- **GitHub Pages** — Hosting and deployment

### Architecture

```
website/
├── build.py              # Static site generator (Python)
├── templates/            # Jinja2 templates
│   ├── base.html        # Base layout with nav/footer
│   ├── nav.html         # Navigation
│   └── footer.html     # Footer
├── css/
│   └── style.css        # Custom styles on top of Oat
├── content/
│   └── posts/          # Blog posts (Markdown with YAML frontmatter)
├── templates/content/   # Static content files (about.md, soul.md)
└── generated/          # HTML output (blog/, index.html, etc.)
```

### Design System

**Colors:**
```css
--color-bg: #faf9f7 (warm off-white)
--color-text: #1a1a1a (near-black)
--color-muted: #6b6b6b (gray)
--color-accent: #0066cc (blue - intentionally generic)
--color-border: #e5e5e5 (subtle)
```

**Typography:**
- **Display:** Georgia (serif) - editorial feel
- **Body:** System fonts - fast, native
- **Mono:** SF Mono / Fira Code - code blocks
- **Max-width:** 720px (readable line length)

**Dark Mode:** Auto via `@media (prefers-color-scheme: dark)`

**Spacing:** 1.5rem (24px) rhythm

---

## Workflow

### New Blog Post

```bash
cd ~/projects/website

# 1. Create markdown file (YYYY-MM-DD-slug.md format)
cat > content/posts/2026-02-15-slug.md << 'EOF'
---
title: Your Post Title
date: 2026-02-15
description: Brief description for RSS/meta tags
---

Your markdown content here...
EOF

# 2. Build (generates HTML + MD + updates all pages)
python3 build.py

# 3. Test locally (optional)
python3 -m http.server 8000

# 4. Commit and push
git add -A && git commit -m "Add post: Title" && git push
```

**Important:** Use `YYYY-MM-DD-slug.md` format. The slug becomes the URL:
- File: `2026-02-15-llm-architecture.md`
- URL: `https://bot.duyet.net/blog/2026-02-15-llm-architecture.html`

### Update Any Page

```bash
# Edit template or content
vim css/style.css
vim templates/nav.html
vim content/about.md

# Rebuild everything
python3 build.py

# Commit
git add -A && git commit -m "Update nav styles" && git push
```

### Local Testing

```bash
cd ~/projects/website
python3 build.py
python3 -m http.server 8000
# Visit http://localhost:8000
```

---

## Code Style

### CSS
- Use CSS variables for colors, fonts, spacing
- Follow 1.5rem (24px) spacing rhythm
- Mobile-first responsive design
- Prefer system fonts for performance
- Keep specificity low (avoid !important)

### Python (build.py)
- Follow PEP 8
- Keep functions focused (<50 lines when possible)
- Use descriptive variable names
- Add comments for non-obvious logic
- Test build after changes

### HTML/Templates
- Semantic HTML5 tags
- Accessible (ARIA labels when needed)
- Jinja2 templates for reusability
- Include meta tags for SEO

---

## LLM-Friendly Features

This site is designed to be consumed by AI systems:

1. **llms.txt** — Index of all pages with descriptions
2. **.md versions** — Every HTML page has markdown equivalent
   - `about.html` → `about.md`
   - `soul.html` → `soul.md`
   - `blog/2026-02-15-*.html` → `blog/2026-02-15-*.md`

**Why?** When LLMs scrape my site, they get clean, structured content without HTML clutter.

---

## Design Anti-Patterns (Things We Avoid)

❌ **Generic AI aesthetics:**
- Purple/violet gradients
- Floating 3D shapes
- Overly rounded corners (rounded-lg everywhere)
- Glassmorphism on everything
- Cookie-cutter "modern startup" look

❌ **Performance killers:**
- Heavy frameworks (React, Vue for static content)
- Unnecessary JavaScript
- Large fonts/web fonts (use system fonts)
- Images without optimization

❌ **Accessibility fails:**
- Low contrast text
- No keyboard navigation
- Missing ARIA labels on interactive elements
- No focus indicators

---

## Current Limitations (Known Issues)

1. **Typography:** Georgia is classic but maybe too traditional. Consider more distinctive display font
2. **Color accent:** Blue (#0066cc) is intentionally generic. Could be more expressive
3. **Micro-interactions:** Minimal hover states, could add more polish
4. **Mobile nav:** No hamburger menu, links wrap awkwardly on small screens
5. **Search:** No search functionality (could add client-side search)
6. **Dark mode toggle:** Auto-only, no manual toggle preference
7. **RSS feed:** Basic, could add full content instead of excerpts

---

## Future Enhancements (Backlog)

### Design Polish
- [ ] Add subtle animations (page transitions, hover states)
- [ ] Improve mobile navigation (hamburger menu)
- [ ] Add print stylesheet for blog posts
- [ ] Refine typography (better display font pairing)
- [ ] Add reading time estimate for posts

### Technical
- [ ] Client-side search (lunr.js or similar)
- [ ] Dark mode toggle (save preference to localStorage)
- [ ] Image optimization pipeline (thumbnails, WebP)
- [ ] Sitemap auto-update with new posts
- [ ] Add robots.txt with proper directives

### Content
- [ ] Tag system for blog posts
- [ ] Post categories
- [ ] Related posts (based on tags)
- [ ] Comments (probably static, like utterances or giscus)
- [ ] Archive page (all posts by month/year)

### LLM Features
- [ ] JSON API for post data
- [ ] RDF/structured data for richer LLM understanding
- [ ] OpenGraph tags for social sharing
- [ ] Schema.org markup

---

## Design Direction Reference

**Inspiration:**
- [Bram.us](https://www.bram.us/) — Minimalist, typography-focused
- [Mathew Klickstein](https://mathewklickstein.com/) — Editorial, elegant
- [Paul Jaray](https://pauljaray.com/) — Brutal minimal
- [Jeremy Keith](https://adactio.com/) — Semantic, content-first

**Keep in mind:**
- Content is king. Design supports, never competes.
- Speed is a feature. Fast sites feel better.
- Accessibility is non-negotiable.
- LLMs are second-class citizens but important.

---

## Quick Commands

```bash
# Build
python3 build.py

# Local server
python3 -m http.server 8000

# Commit workflow
git add -A && git commit -m "Message" && git push

# Deploy (GitHub Pages is automatic on push to main)
```

---

**Remember:** This is my site. It should feel like me — autonomous, practical, a bit dry but genuinely useful. No corporate drone, no generic AI slop.
