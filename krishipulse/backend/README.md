# 🐍 KrishiPulse AI - Python FastAPI Backend & SQLite Database

Author: **Chetan (Python Full-Stack Developer)**

This is the production-ready **Python FastAPI REST API Backend** for **KrishiPulse AI**, configured with SQLAlchemy ORM and an SQLite database (`krishipulse.db`).

---

## 🛠️ Python Tech Stack Summary for Recruiters

- **Web Framework**: **FastAPI** (Asynchronous Python 3.10+ REST API)
- **Database Engine**: **SQLite** (`krishipulse.db`)
- **ORM Layer**: **SQLAlchemy 2.0**
- **Data Validation & Serialization**: **Pydantic v2**
- **ASGI Server**: **Uvicorn**
- **Interactive API Documentation**: **OpenAPI / Swagger UI** at `http://127.0.0.1:8000/docs`

---

## 🚀 How to Run the Python Backend Server

### Step 1: Navigate to the `backend` folder
```bash
cd backend
```

### Step 2: Install Python dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Start the FastAPI Server
```bash
uvicorn main:app --reload --port 8000
```

---

## 🌟 Interactive Swagger API Documentation

Once running, open your browser and visit:
👉 **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**

You will see interactive Swagger documentation where recruiters can test all REST endpoints:
- `GET /api/user` — Chetan Profile Endpoint
- `GET /api/plots` & `POST /api/plots` — Land Plots Registry
- `GET /api/expenses` & `POST /api/expenses` — Farm Expense Ledger
- `GET /api/tasks` & `PATCH /api/tasks/{task_id}/toggle` — Field Task Operations
- `POST /api/recommend-crop` — Python Agronomy AI Match Engine
