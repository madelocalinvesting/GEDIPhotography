## GEDIPhotography Monorepo Scaffold

This repo contains three minimal apps:

- **frontend**: Next.js 14 (TypeScript, App Router)
- **backend**: Python FastAPI with a health endpoint
- **html**: Plain static HTML/CSS

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+ (or a virtualenv/conda environment)

### Frontend (Next.js)
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Run the dev server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`.  
   - Frontend health route: `http://localhost:3000/api/health`
   - Backend base URL is read from `NEXT_PUBLIC_API_BASE_URL`
   - Copy `frontend/env.local.example` to `.env.local` and adjust as needed

### Backend (FastAPI)
1. Create and activate a virtual environment (recommended):
   ```bash
   cd backend
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the API with Uvicorn:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
4. Health check: `http://localhost:8000/health`

### Static HTML
You can open `html/index.html` directly in a browser, or serve the folder locally:
```bash
cd html
python -m http.server 8080
```
Then visit `http://localhost:8080`.

### Lovable Integration
- Your Lovable project: [`https://lovable.dev/projects/1e263cac-2244-4c6b-8e86-6ba68f3b5522`](https://lovable.dev/projects/1e263cac-2244-4c6b-8e86-6ba68f3b5522)
- In Lovable project settings, set:
  - `NEXT_PUBLIC_API_BASE_URL = https://YOUR-PUBLIC-BACKEND-URL`
- CORS is enabled for local dev and `*.lovable.dev` in `backend/app/main.py`.
- Optionally connect Lovable ↔ GitHub to work from this repo: see Lovable docs: [Getting started](https://docs.lovable.dev/introduction/getting-started), [GitHub integration](https://docs.lovable.dev/integrations/github), [Self‑hosting tips](https://docs.lovable.dev/tips-tricks/self-hosting).

### Tunneling your local backend (for Lovable to reach it)
Option A — ngrok:
```bash
# 1) Install ngrok and set your token once:
ngrok config add-authtoken <YOUR_TOKEN>
# 2) From repo root, start tunnel using provided config:
ngrok start --config ./ngrok.yml backend
```
This exposes an HTTPS URL that forwards to `http://localhost:8000`.

Option B — Cloudflare Tunnel:
```bash
# 1) Install cloudflared, login: cloudflared login
# 2) Create a named tunnel:
cloudflared tunnel create dev-backend
# 3) Run the tunnel pointing to localhost:8000:
cloudflared tunnel --config ./cloudflared-example.yml run dev-backend
```
Use the public URL from your tunnel as `NEXT_PUBLIC_API_BASE_URL` in Lovable.

### Project Structure
```
frontend/    # Next.js app (App Router)
backend/     # FastAPI app with /health
html/        # Minimal static site
```

