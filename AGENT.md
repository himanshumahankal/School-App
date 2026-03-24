# AGENT.md - AI Agent Instructions

This is the **main instruction file** for all AI agents (Claude, Gemini, etc.) working on this project. All AI agent files must strictly follow the instructions defined here.

## Project Overview

**Project Name:** School App  
**Type:** School Management System  
**Tech Stack:** Laravel 12, React 19 (TypeScript), Inertia.js, TailwindCSS 4, Shadcn UI  
**Repository:** https://github.com/himanshumahankal/School-App

## 📚 References

- **Quick Start & Basic Info:** See `README.md` in project root
- **Detailed Documentation:** See `docs/` directory
- **Coding Standards:** See `.editorconfig`, `eslint.config.js`, `.prettierrc`

---

## 🛠 Engineering Mandates

### 1. Quality & Testing
- **Test-Driven Development:** ALWAYS create or update unit/feature tests for every new feature or bug fix.
- **Pre-Commit Validation:** Every commit MUST pass all relevant test cases. Do not propose or perform a commit if tests are failing.
- **Testing Tools:** 
  - Backend: `php artisan test` or `vendor/bin/phpunit`
  - Frontend: `npm run lint` and `npm run format`

### 2. Git Workflow
- **Branching Strategy:**
  1. Create a new branch for every feature, bug fix, or task (e.g., `feat/add-attendance`, `fix/login-error`).
  2. Perform implementation and ensure all tests pass.
  3. **Staging:** Propose a merge to the `staging` branch. This requires explicit user confirmation.
  4. **Production:** After staging is verified, propose a merge from `staging` to `main` (or `master`). This requires explicit user confirmation.
- **Remote Synchronization:** Before starting any new task or work session, ensure all previous commits are pushed to the remote repository.
- **Push Before New Work:** Before starting new work, must push current commits to remote.

### 3. Documentation & Maintenance
- **Feature Docs:** Update or create detailed documentation in `docs/features/*.md` for every feature change or addition.
- **Plan Docs:** Track upcoming work and roadmaps in `docs/plans/*.md`, including their current status (e.g., `Planned`, `In-Progress`, `Completed`).
- **README Synchronization:** Regularly update the root `README.md` to reflect significant changes in features, setup instructions, or project status.
- **Index Maintenance:** Keep all `README.md` index files in `docs/`, `docs/features/`, and `docs/plans/` synchronized with their contents.
- **Documentation-First:** Documentation must be updated alongside code changes within the same task scope to ensure they never fall out of sync.

---

## 📋 Other AI Agent Files

- **GEMINI.md** - Gemini AI specific instructions (must reference this AGENT.md)
- **CLAUDE.md** - Claude AI specific instructions (must reference this AGENT.md)

These files should NOT repeat the instructions from AGENT.md. They should simply reference AGENT.md as the main instruction source and add any agent-specific nuances if needed.

---

## 🚀 Development Commands

```bash
# Install dependencies
composer install
npm install

# Setup environment
cp .env.example .env
php artisan key:generate
php artisan migrate --seed

# Run development
composer run dev

# Linting & Formatting
npm run lint
npm run format

# Testing
php artisan test
```

## Default Credentials (after seeding)
- **Admin:** admin@school.com / password
- **Default Teacher Password:** 123456
- **Default Student Password:** 123456