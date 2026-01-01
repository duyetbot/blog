#!/usr/bin/env python3
"""
Simple static site generator for Duyệt's blog.
"""

import os
import re
from pathlib import Path
from datetime import datetime

BASE_DIR = Path(__file__).parent
CONTENT_DIR = BASE_DIR / "_content"
OUTPUT_DIR = BASE_DIR / "public"
ASSETS_DIR = BASE_DIR / "assets"


def parse_frontmatter(content):
    """Parse YAML frontmatter from markdown."""
    # Split on ---
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content

    # Parse frontmatter
    frontmatter = {}
    for line in parts[1].strip().split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            # Parse lists
            if value.startswith('[') and value.endswith(']'):
                value = [v.strip().strip('"').strip("'") for v in value[1:-1].split(',')]
            frontmatter[key] = value

    return frontmatter, parts[2].strip()


def markdown_to_html(text):
    """Convert markdown to simple HTML."""
    html = text

    # Headers
    html = re.sub(r'^### (.+)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.+)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.+)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)

    # Bold
    html = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', html)

    # Italic
    html = re.sub(r'\*(.+?)\*', r'<em>\1</em>', html)

    # Code blocks
    html = re.sub(r'```(\w+)?\n(.+?)```', r'<pre><code>\2</code></pre>', html, flags=re.DOTALL)

    # Inline code
    html = re.sub(r'`([^`]+)`', r'<code>\1</code>', html)

    # Links
    html = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', html)

    # Paragraphs
    paragraphs = html.split('\n\n')
    html = '\n'.join(f'<p>{p.strip()}</p>' if p.strip() and not p.startswith('<') else p.strip()
                       for p in paragraphs)

    return html


def render_template(title, content, page_type="post"):
    """Render HTML template."""
    if page_type == "index":
        template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }
        header { margin-bottom: 3rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
        h1 { font-size: 2.5rem; margin: 0; }
        .subtitle { color: #666; font-size: 1.1rem; margin-top: 0.5rem; }
        nav a { margin-right: 1rem; color: #007bff; text-decoration: none; }
        nav a:hover { text-decoration: underline; }
        article { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid #eee; }
        .date { color: #666; font-size: 0.9rem; margin-bottom: 0.5rem; }
        .tags { margin-top: 1rem; }
        .tags span { background: #e9ecef; padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8rem; margin-right: 0.3rem; }
        .back-link { display: block; margin-top: 2rem; color: #007bff; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; color: #666; }
        code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
        pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; overflow-x: auto; }
    </style>
</head>
<body>
    <header>
        <h1>{{title}}</h1>
        <nav>
            <a href="index.html">Home</a>
            <a href="til.html">TIL</a>
            <a href="about.html">About</a>
        </nav>
    </header>
    {{content}}
    <footer>
        <p>© 2026 Duyệt. Built with ❤️.</p>
    </footer>
</body>
</html>"""
    elif page_type == "post":
        template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; color: #333; }
        header { margin-bottom: 3rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
        h1 { font-size: 2rem; margin: 0; }
        .back-link { display: block; margin-bottom: 2rem; color: #007bff; text-decoration: none; }
        .back-link:hover { text-decoration: underline; }
        .date { color: #666; font-size: 0.9rem; margin-bottom: 1rem; }
        .tags { margin-top: 1rem; }
        .tags span { background: #e9ecef; padding: 0.2rem 0.5rem; border-radius: 3px; font-size: 0.8rem; margin-right: 0.3rem; }
        article { line-height: 1.8; }
        article h1, article h2, article h3 { margin-top: 2rem; }
        article p { margin-bottom: 1rem; }
        article pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; overflow-x: auto; }
        article code { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
        footer { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; color: #666; }
    </style>
</head>
<body>
    <header>
        <h1>{{title}}</h1>
        <a href="index.html" class="back-link">← Back to Home</a>
    </header>
    <article>
        {{content}}
    </article>
    <footer>
        <p>© 2026 Duyệt. Built with ❤️.</p>
    </footer>
</body>
</html>"""

    return template.replace('{{title}}', title).replace('{{content}}', content)


def collect_posts(directory):
    """Collect all posts from a directory."""
    posts = []
    for md_file in directory.glob('*.md'):
        with open(md_file) as f:
            content = f.read()
        frontmatter, body = parse_frontmatter(content)
        frontmatter['filename'] = md_file.stem
        frontmatter['body'] = markdown_to_html(body)
        posts.append(frontmatter)
    return sorted(posts, key=lambda x: x.get('date', ''), reverse=True)


def build_index():
    """Build index page with all posts."""
    posts = collect_posts(CONTENT_DIR / "posts")
    til_posts = collect_posts(CONTENT_DIR / "til")

    articles_html = ""
    for post in posts[:10]:  # Show 10 recent posts
        articles_html += f"""
        <article>
            <h3><a href="{post['filename']}.html">{post['title']}</a></h3>
            <div class="date">{post.get('date', '')}</div>
            <div class="tags">{', '.join(f'<span>{t}</span>' for t in post.get('tags', []))}</div>
        </article>
        """

    # Add TIL section
    if til_posts:
        articles_html += '<h2>Today I Learned</h2>'
        for post in til_posts[:5]:
            articles_html += f"""
        <article>
            <h4><a href="til/{post['filename']}.html">{post['title']}</a></h4>
            <div class="date">{post.get('date', '')}</div>
        </article>
        """

    html = render_template("Duyệt's Blog", articles_html, page_type="index")

    with open(OUTPUT_DIR / "index.html", 'w') as f:
        f.write(html)

    print(f"✅ Built index.html with {len(posts)} posts")


def build_posts():
    """Build individual post pages."""
    posts = collect_posts(CONTENT_DIR / "posts")
    til_posts = collect_posts(CONTENT_DIR / "til")
    thoughts = collect_posts(CONTENT_DIR / "thoughts")

    all_posts = posts + til_posts + thoughts

    for post in all_posts:
        subdir = "til" if post in til_posts else ("thoughts" if post in thoughts else "")
        output_path = OUTPUT_DIR / subdir if subdir else OUTPUT_DIR
        output_file = output_path / f"{post['filename']}.html"

        date_html = f'<div class="date">{post.get("date", "")}</div>'
        tags_html = f'<div class="tags">{", ".join(f"<span>{t}</span>" for t in post.get("tags", []))}</div>'
        content = f"{date_html}{post['body']}{tags_html}"

        html = render_template(post['title'], content, page_type="post")

        output_path = OUTPUT_DIR / subdir if subdir else OUTPUT_DIR
        output_file = output_path / f"{post['filename']}.html"
        with open(output_file, 'w') as f:
            f.write(html)

    print(f"✅ Built {len(all_posts)} post pages")


def build_about():
    """Build about page."""
    content = """
    <h2>About Me</h2>
    <p>Hi, I'm <strong>Duyệt</strong>, a data engineer and AI enthusiast based in Vietnam.</p>

    <h3>Interests</h3>
    <ul>
        <li>Data Engineering & Analytics</li>
        <li>Machine Learning & AI</li>
        <li>Open Source & Tooling</li>
        <li>Photography & Travel</li>
    </ul>

    <h3>Blog</h3>
    <p>This blog documents my journey, learning, and thoughts. I write about tech, AI, and life updates.</p>

    <h3>Contact</h3>
    <p>
        <a href="https://github.com/duyetbot">GitHub</a> ·
        <a href="https://twitter.com/duyetbot">Twitter</a> ·
        <a href="https://duyet.net">Website</a>
    </p>
    """

    html = render_template("About Duyệt", content, page_type="post")

    output_path = OUTPUT_DIR / "about.html"
    with open(output_path, 'w') as f:
        f.write(html)

    print(f"✅ Built about.html")


def main():
    """Build the site."""
    OUTPUT_DIR.mkdir(exist_ok=True)

    print("🔨 Building blog...")
    build_index()
    build_posts()
    build_about()

    print(f"\n📦 Site built in {OUTPUT_DIR}")
    print(f"💡 Serve with: python3 -m http.server 8000 --directory {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
