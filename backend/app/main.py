from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GEDI Backend", version="0.1.0")

allowed_origins = [
    "http://localhost:3000",  # Next.js dev
    "http://localhost:8080",  # static html dev (if it ever calls API)
    "https://lovable.dev",    # Lovable root
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"^https://.*\.lovable\.dev$",  # allow Lovable preview/prod subdomains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "backend"}

