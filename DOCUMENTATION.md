# Portfolio Documentation

## Purpose

This repository contains the main portfolio application for `RzenDev`, focused on production-ready frontend quality, maintainability, and professional project presentation.

## Local Development

```bash
npm install
npm run dev
```

Default local URL: `http://localhost:5173`

## Quality Workflow

- `npm run lint` for static analysis
- `npm run build` for production validation
- Husky pre-commit hook to enforce lint and build checks before commit

## Main Sections

- Hero and professional summary
- Skills and technology stack
- Featured production projects
- Contact and profile links

## Engineering Practices

- Branch protection on `main`
- Pull request based merge workflow
- Conventional Commits
- CI checks through GitHub Actions
- Repository templates for PRs and issues

## Repository Notes

- Keep changes scoped and atomic by topic.
- Prefer updates through feature/chore/docs branches and PRs.
- Keep public metadata concise and privacy-aware.
