"""
KrishiPulse - Python FastAPI Backend REST API Server (main.py)
Author: Chetan (Mandya, Karnataka)
Description: FastAPI REST API for KrishiPulse Smart Agriculture SaaS.
"""

import sys
import os

# Ensure backend directory is in Python path for clean module imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import database, models
from routes import user, market, weather, farm, advisor

# Create SQLite Database Tables on Startup
models.Base.metadata.create_all(bind=database.engine)

# Initialize FastAPI App
app = FastAPI(
    title="KrishiPulse REST API",
    description="Smart Agriculture & Karnataka APMC Mandi Telemetry Platform.",
    version="1.0.0"
)

# Enable CORS Middleware for Frontend Origins
origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:8000",
    "http://localhost:8000",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(user.router)
app.include_router(market.router)
app.include_router(weather.router)
app.include_router(farm.router)
app.include_router(advisor.router)

@app.get("/")
def read_root():
    return {
        "status": "Online",
        "app": "KrishiPulse REST API",
        "author": "Chetan",
        "district": "Mandya, Karnataka",
        "totalDistricts": 31,
        "docs": "http://127.0.0.1:8000/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
