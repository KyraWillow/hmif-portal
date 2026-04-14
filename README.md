# HMIF Portal Monorepo

Production-ready monorepo for:
- `frontend/`: React + Vite (deploy to Vercel)
- `backend/`: Go (Gin + GORM + PostgreSQL, deploy to Railway)

## Architecture
- Frontend calls backend API via `VITE_API_BASE_URL`.
- Backend serves API under `/api` and health check at `/healthz`.
- Backend auto-runs GORM `AutoMigrate` on startup.
- No automatic seed script is executed by the app.

## Environment Variables

### Frontend (`frontend/.env`)
- `VITE_API_BASE_URL` (required in production)
  - Example: `https://your-backend-service.up.railway.app/api`

Reference: `frontend/.env.example`

### Backend (`backend/.env` or Railway Variables)
Required:
- `DATABASE_URL` **or** full `DB_*` set (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_NAME`; plus `DB_PASSWORD` if needed)
- `ADMIN_TOKEN`

Optional:
- `PORT` (Railway injects this automatically)
- `GIN_MODE` (set to `release` in production)
- `CORS_ALLOWED_ORIGINS` (comma-separated)
- `DB_SSLMODE` (default `disable`)
- `DB_TIMEZONE` (default `Asia/Jakarta`)

Reference: `backend/.env.example`

## Local Development

### 1. Backend
```bash
cd backend
cp .env.example .env
# edit .env values
go run ./cmd/app
```
Backend runs on `http://localhost:8080` by default.

### 2. Frontend
```bash
cd frontend
cp .env.example .env
npm ci
npm run dev
```
Frontend runs on `http://localhost:5173` by default.

## Deploy Frontend to Vercel
Create a Vercel project from this repo with these exact settings:

- **Root Directory**: `frontend`
- **Install Command**: `npm ci`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

Set environment variable:
- `VITE_API_BASE_URL=https://<railway-backend-domain>/api`

Notes:
- SPA routing fallback is configured in `frontend/vercel.json`.
- Routes like `/admin` are rewritten to `index.html` in production.

## Deploy Backend to Railway
Create a Railway service from this repo with these exact settings:

- **Root Directory**: `backend`
- **Start Command**: `go run ./cmd/app`

Set Railway Variables:
- `DATABASE_URL` (from Railway PostgreSQL or external PostgreSQL)
- `ADMIN_TOKEN`
- `GIN_MODE=release`
- `CORS_ALLOWED_ORIGINS=https://<your-vercel-domain>,https://*.vercel.app`

Health check:
- Endpoint: `GET /healthz`
- Expected: HTTP `200` with JSON `{ "status": "ok" }`

## Build Verification Commands

### Frontend
```bash
cd frontend
npm run build
```

### Backend
```bash
cd backend
go build ./...
```

## Important Notes
- `backend/database/schema.sql` contains destructive SQL (`TRUNCATE ...`) for manual data reset and is **not** executed automatically by app startup.
- Admin endpoints (`/api/admin/*`) require header `X-Admin-Token` matching `ADMIN_TOKEN`.
