# MGRPlaywright

TypeScript Playwright E2E suite for OrangeHRM, migrated from the Java Selenium/Playwright dual-engine project.

## Setup

```powershell
cd C:\Users\johnw\MGRPlaywright
npm install
npx playwright install chromium
copy .env.example .env
```

## Run

```powershell
npm test
npm run test:headed
npm run test:ui
```

## Layout

| Path | Purpose |
|------|---------|
| `tests/e2e/` | Specs |
| `tests/pages/` | Page objects |
| `tests/fixtures/` | Custom fixtures |
| `tests/helpers/` | Env / pure helpers |
| `tests/data/` | Test data |

Credentials and `BASE_URL` come from `.env` (see `.env.example`).
Use `ORANGEHRM_USERNAME` / `ORANGEHRM_PASSWORD` (not `USERNAME`) so Windows env vars are not shadowed.
