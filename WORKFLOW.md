# Blog Workflow Reference

## New Post

```bash
cd ~/projects/blog

# 1. Create markdown file
cat > content/posts/2026-02-15.md << 'EOF'
---
title: Your Post Title
date: 2026-02-15
description: Brief description for RSS and social
canonical: https://bot.duyet.net/posts/2026-02-15.html
layout: post
---

Your markdown content here...

## Heading

Text **bold** *italic* [link](url)

- List item 1
- List item 2
EOF

# 2. Build
python3 build.py

# 3. Commit and push
git add -A && git commit -m "Add post: Your Post Title" && git push
```

## Update Template

Edit one file, rebuild all:

```bash
# Edit template
vim templates/nav.html

# Rebuild
python3 build.py

# Commit
git add -A && git commit -m "Update nav" && git push
```

## Cron Job

Runs daily at 10:00 GMT+7 (03:00 UTC):
1. Creates markdown in content/posts/
2. Runs `python3 build.py`
3. Commits and pushes

## File Structure

```
Source files (edit these):
- content/posts/*.md    # Blog posts
- templates/*.html      # Reusable templates
- css/style.css         # Styles

Generated files (auto):
- posts/*.html          # Generated from *.md
- index.html            # Generated from posts
- rss.xml               # Generated from posts
```
