"""
KrishiPulse - CRUD Operations (crud.py)
Author: Chetan (Mandya, Karnataka)
Description: Database operations for SQLite (users, plots, APMC prices) with SHA-256 password hashing.
"""

import hashlib
import uuid
from sqlalchemy.orm import Session
import models, schemas

def hash_password(password: str) -> str:
    """
    Hashes plain text password using SHA-256 algorithm.
    Ensures passwords are NEVER stored in plain text.
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def get_user_profile(db: Session):
    """
    Gets or seeds default profile for Chetan.
    """
    user = db.query(models.UserModel).filter(models.UserModel.id == "usr-chetan").first()
    if not user:
        user = models.UserModel(
            id="usr-chetan",
            name="Chetan",
            email="chetanreddy445@gmail.com",
            phone="7338025342",
            role="Lead Agronomist & Enterprise Farmer",
            district="Mandya",
            farm_size_acres=12.5,
            hashed_password=hash_password("admin123")
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

def create_user(db: Session, signup_data: schemas.UserSignupSchema):
    """
    Creates a new user record in SQLite 'users' table with hashed password.
    """
    existing_user = db.query(models.UserModel).filter(
        (models.UserModel.email == signup_data.email) | (models.UserModel.phone == signup_data.phone)
    ).first()
    
    if existing_user:
        return None  # User already exists

    new_user = models.UserModel(
        id=f"usr-{str(uuid.uuid4())[:8]}",
        name=signup_data.name,
        email=signup_data.email,
        phone=signup_data.phone,
        role="Registered Farmer",
        district=signup_data.district,
        farm_size_acres=5.0,
        hashed_password=hash_password(signup_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, email_or_phone: str, password_plain: str):
    """
    Authenticates user against SQLite 'users' table using hashed password comparison.
    """
    # Ensure default user exists
    get_user_profile(db)

    user = db.query(models.UserModel).filter(
        (models.UserModel.email == email_or_phone) | (models.UserModel.phone == email_or_phone)
    ).first()

    if not user:
        return None

    if user.hashed_password == hash_password(password_plain):
        return user

    return None

def get_farm_plots(db: Session):
    plots = db.query(models.PlotModel).all()
    if not plots:
        default_plots = [
            models.PlotModel(id="plot-1", plot_name="North Field - Finger Millet", district="Mandya", area_acres=5.5, current_crop="Finger Millet (Ragi)", sowing_date="2026-05-15", expected_harvest_date="2026-09-30", growth_stage="Vegetative", health_score_pct=94, total_expenses_rs=42000, expected_revenue_rs=245000),
            models.PlotModel(id="plot-2", plot_name="East Field - Sugarcane", district="Mandya", area_acres=4.0, current_crop="Sugarcane", sowing_date="2025-11-10", expected_harvest_date="2026-11-20", growth_stage="Maturation", health_score_pct=88, total_expenses_rs=65000, expected_revenue_rs=380000),
            models.PlotModel(id="plot-3", plot_name="South Field - Hybrid Tomato", district="Mandya", area_acres=3.0, current_crop="Hybrid Tomato", sowing_date="2026-06-01", expected_harvest_date="2026-08-25", growth_stage="Flowering & Fruiting", health_score_pct=91, total_expenses_rs=35000, expected_revenue_rs=195000)
        ]
        db.add_all(default_plots)
        db.commit()
        plots = db.query(models.PlotModel).all()
    return plots

def get_apmc_prices(db: Session, district: str = "Mandya"):
    prices = db.query(models.APMCPriceModel).filter(models.APMCPriceModel.district == district).all()
    if not prices:
        default_prices = [
            models.APMCPriceModel(id="apmc-1", crop_name="Finger Millet (Ragi)", mandi_name="Mandya Main APMC", district="Mandya", modal_price=3450, min_price=3200, max_price=3650, arrival_qty_tonnes=145.5, change_percent=3.2, category="Cereals"),
            models.APMCPriceModel(id="apmc-2", crop_name="Sugarcane (Co-86032)", mandi_name="Maddur APMC Market", district="Mandya", modal_price=3150, min_price=3000, max_price=3300, arrival_qty_tonnes=420.0, change_percent=1.5, category="Cash Crops"),
            models.APMCPriceModel(id="apmc-3", crop_name="Hybrid Red Tomato", mandi_name="Kolar APMC Market", district="Kolar", modal_price=1850, min_price=1600, max_price=2100, arrival_qty_tonnes=580.0, change_percent=-4.5, category="Vegetables")
        ]
        db.add_all(default_prices)
        db.commit()
        prices = db.query(models.APMCPriceModel).all()
    return prices
