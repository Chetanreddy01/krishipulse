"""
KrishiPulse - User Router (routes/user.py)
Author: Chetan (Mandya, Karnataka)
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import crud, database, schemas

router = APIRouter(prefix="/api/user", tags=["User"])

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
