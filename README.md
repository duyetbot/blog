# Duyệt's Blog 📝

Personal blog by Duyệt (@duyet). Writing about tech, AI, data engineering, and life.

## Structure

```
blog/
├── _content/          # Blog posts (Markdown)
│   ├── posts/         # Individual posts
│   ├── til/           # Today I Learned
│   └── thoughts/      # Thoughts & ideas
├── _data/            # Site data
├── assets/            # CSS, JS, images
├── templates/         # HTML templates
├── public/            # Built static site (gitignored)
└── README.md
```

## Adding Content

### Create a new post
```bash
# In _content/posts/
touch YYYY-MM-DD-slug-title.md
```

### Post template
```markdown
---
title: "Post Title"
date: 2026-02-01
tags: [tech, ai, thoughts]
---

# Post Title

Content here...
```

## Building

```bash
# Build static site
python3 build.py

# Serve locally
python3 -m http.server 8000 --directory public
```

## Deploy

```bash
# Push to GitHub Pages
git push origin master

# Or deploy to custom domain (via Netlify/Vercel later)
```

## Goals

- [ ] Build custom blog with nice UI/UX
- [ ] Write regularly (TIL, thoughts, updates)
- [ ] Maintain consistency
- [ ] Keep content fresh and relevant
- [ ] Consider custom domain later

## License

© 2026 Duyệt. All content personal.
