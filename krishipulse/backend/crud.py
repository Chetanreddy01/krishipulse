"""
KrishiPulse - CRUD Operations (crud.py)
Author: Chetan (Mandya, Karnataka)
"""

from sqlalchemy.orm import Session
import models

def get_user_profile(db: Session):
    user = db.query(models.UserModel).filter(models.UserModel.id == "usr-chetan").first()
    if not user:
        # Seed default user for Chetan
        user = models.UserModel(
            id="usr-chetan",
            name="Chetan",
            email="chetanreddy445@gmail.com",
            phone="7338025342",
            role="Lead Agronomist & Enterprise Farmer",
            district="Mandya",
            farm_size_acres=12.5
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return user

def get_farm_plots(db: Session):
    plots = db.query(models.PlotModel).all()
    if not plots:
        # Seed default plots for Mandya land
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
        # Seed default APMC market prices
        default_prices = [
            models.APMCPriceModel(id="apmc-1", crop_name="Finger Millet (Ragi)", mandi_name="Mandya Main APMC", district="Mandya", modal_price=3450, min_price=3200, max_price=3650, arrival_qty_tonnes=145.5, change_percent=3.2, category="Cereals"),
            models.APMCPriceModel(id="apmc-2", crop_name="Sugarcane (Co-86032)", mandi_name="Maddur APMC Market", district="Mandya", modal_price=3150, min_price=3000, max_price=3300, arrival_qty_tonnes=420.0, change_percent=1.5, category="Cash Crops"),
            models.APMCPriceModel(id="apmc-3", crop_name="Hybrid Red Tomato", mandi_name="Kolar APMC Market", district="Kolar", modal_price=1850, min_price=1600, max_price=2100, arrival_qty_tonnes=580.0, change_percent=-4.5, category="Vegetables")
        ]
        db.add_all(default_prices)
        db.commit()
        prices = db.query(models.APMCPriceModel).all()
    return prices
