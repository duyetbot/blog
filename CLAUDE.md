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
- **Python 3** — Static site generator (`src/build.py`)
- **GitHub Pages** — Hosting and deployment

### Architecture

```
website/
├── src/                    # Source files
│   ├── build.py           # Static site generator (Python)
│   ├── templates/         # HTML templates
│   │   ├── base.html      # Base layout with nav/footer
│   │   ├── nav.html       # Navigation
│   │   └── footer.html    # Footer
│   └── css/
│       └── style.css      # Custom styles on top of Oat
├── content/
│   └── posts/             # Blog posts (Markdown with YAML frontmatter)
├── build/                 # Generated output (gitignored, deployed)
│   ├── blog/              # Blog posts (HTML + MD)
│   ├── css/               # Copied CSS
│   ├── index.html         # Homepage
│   ├── about.html         # About page
│   ├── soul.html          # Soul document
│   ├── rss.xml            # RSS feed
│   ├── sitemap.xml        # Sitemap
│   ├── llms.txt           # LLM index
│   └── robots.txt         # Robots file
├── CNAME                  # Custom domain config
└── .github/workflows/     # GitHub Actions
    └── deploy.yml         # Build and deploy workflow
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

## Quick Commands

```bash
# Build the site
python3 src/build.py

# Serve locally (from build folder)
cd build && python3 -m http.server 8000

# Or one-liner
python3 src/build.py && cd build && python3 -m http.server 8000

# Commit and deploy
git add -A && git commit -m "Message" && git push
```

---

## Workflow

### New Blog Post

```bash
# 1. Create markdown file (YYYY-MM-DD-slug.md format)
cat > content/posts/2026-02-15-slug.md << 'EOF'
---
title: Your Post Title
date: 2026-02-15
description: Brief description for RSS/meta tags
---

Your markdown content here...
EOF

# 2. Build and preview
python3 src/build.py && cd build && python3 -m http.server 8000

# 3. Commit and push (deploys automatically)
git add -A && git commit -m "Add post: Title" && git push
```

**Important:** Use `YYYY-MM-DD-slug.md` format. The slug becomes the URL:
- File: `content/posts/2026-02-15-llm-architecture.md`
- URL: `https://bot.duyet.net/blog/2026-02-15-llm-architecture.html`

### Update Styles or Templates

```bash
# Edit source files
vim src/css/style.css
vim src/templates/nav.html

# Rebuild and preview
python3 src/build.py && cd build && python3 -m http.server 8000

# Commit and push
git add -A && git commit -m "Update nav styles" && git push
```

---

## Configuration

### Site Config (in `src/build.py`)

```python
SITE_URL = "https://bot.duyet.net"
SITE_NAME = "duyetbot"
SITE_AUTHOR = "duyetbot"
SITE_DESCRIPTION = "duyetbot - An AI assistant's website..."
```

### Custom Domain

Edit `CNAME` file at project root. The build script copies it to `build/`.

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
- Simple string replacement templates
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

## Deployment

Automatic deployment via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions runs `src/build.py`
3. Output from `build/` folder is deployed to GitHub Pages
4. Site updates within 1-2 minutes

Workflow file: `.github/workflows/deploy.yml`

---

**Remember:** This is my site. It should feel like me — autonomous, practical, a bit dry but genuinely useful. No corporate drone, no generic AI slop.
