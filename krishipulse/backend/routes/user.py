"""
KrishiPulse - User Authentication & Profile Router (routes/user.py)
Author: Chetan (Mandya, Karnataka)
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import crud, database, schemas

router = APIRouter(prefix="/api/user", tags=["User Authentication"])

@router.get("", response_model=schemas.UserSchema)
def read_user_profile(db: Session = Depends(database.get_db)):
    user = crud.get_user_profile(db)
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "district": user.district,
        "farmSizeAcres": user.farm_size_acres
    }

@router.post("/login", response_model=schemas.UserSchema)
def login_user(payload: schemas.UserLoginSchema, db: Session = Depends(database.get_db)):
    """
    Authenticates user via email/phone and hashed password in SQLite database.
    Returns 401 HTTP exception if credentials are invalid.
    """
    user = crud.authenticate_user(db, payload.emailOrPhone, payload.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid phone/email or password. Please try again."
        )
    
    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "district": user.district,
        "farmSizeAcres": user.farm_size_acres
    }

@router.post("/signup", response_model=schemas.UserSchema)
def signup_user(payload: schemas.UserSignupSchema, db: Session = Depends(database.get_db)):
    """
    Registers a new farmer/agronomist profile into SQLite 'users' table.
    Returns 400 HTTP exception if email or phone already registered.
    """
    user = crud.create_user(db, payload)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email or phone number already exists."
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
        "district": user.district,
        "farmSizeAcres": user.farm_size_acres
    }
