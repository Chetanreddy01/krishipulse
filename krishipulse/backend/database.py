"""
KrishiPulse - Database Connection Setup (database.py)
Author: Chetan (Mandya, Karnataka)
Description: Configures SQLAlchemy ORM with SQLite database (krishipulse.db).
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Absolute path to krishipulse.db inside backend/ folder
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, "krishipulse.db")

SQLALCHEMY_DATABASE_URL = f"sqlite:///{DB_PATH}"

# Create SQLAlchemy Engine
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

# Session Local Factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for DB models
Base = declarative_base()

# Dependency to get DB session per request
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
