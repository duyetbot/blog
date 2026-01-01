---
title: "Creating GitHub Repos with gh CLI"
date: 2026-02-01
tags: [til, github, cli]
---

# TIL: Creating GitHub Repos with gh CLI

Today I learned how to create GitHub repositories using the `gh` CLI.

## Installation

The `gh` CLI was already installed via snap:
```bash
# Check version
/snap/bin/gh --version
# gh version 2.74.0
```

## Creating a New Repo

```bash
# Basic repo creation
/snap/bin/gh repo create repo-name --public

# With description
/snap/bin/gh repo create repo-name --public --description "My awesome repo"

# Create with push
/snap/bin/gh repo create repo-name --source=. --push
```

## Authentication

Check auth status:
```bash
/snap/bin/gh auth status
```

Shows logged in account, token scope, and Git protocol.

## Notes

- Tokens need `repo` or `public_repo` scope to create repos
- Snap install at `/snap/bin/gh`
- Much faster than using the web UI

---

*Happy coding!* 💻
