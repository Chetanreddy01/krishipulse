"""
KrishiPulse - Database ORM Models (models.py)
Author: Chetan (Mandya, Karnataka)
"""

from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True)
    phone = Column(String, nullable=False)
    role = Column(String, default="farmer")
    district = Column(String, default="Mandya")
    farm_size_acres = Column(Float, default=12.5)

class PlotModel(Base):
    __tablename__ = "plots"

    id = Column(String, primary_key=True, index=True)
    plot_name = Column(String, nullable=False)
    district = Column(String, default="Mandya")
    area_acres = Column(Float, nullable=False)
    current_crop = Column(String, nullable=False)
    sowing_date = Column(String)
    expected_harvest_date = Column(String)
    growth_stage = Column(String, default="Vegetative")
    health_score_pct = Column(Integer, default=95)
    total_expenses_rs = Column(Float, default=0.0)
    expected_revenue_rs = Column(Float, default=0.0)

class ExpenseModel(Base):
    __tablename__ = "expenses"

    id = Column(String, primary_key=True, index=True)
    plot_id = Column(String, ForeignKey("plots.id"))
    category = Column(String, nullable=False)
    amount_rs = Column(Float, nullable=False)
    date = Column(String, nullable=False)
    notes = Column(String)

class APMCPriceModel(Base):
    __tablename__ = "apmc_prices"

    id = Column(String, primary_key=True, index=True)
    crop_name = Column(String, nullable=False)
    mandi_name = Column(String, nullable=False)
    district = Column(String, nullable=False)
    modal_price = Column(Float, nullable=False)
    min_price = Column(Float, nullable=False)
    max_price = Column(Float, nullable=False)
    arrival_qty_tonnes = Column(Float, default=0.0)
    change_percent = Column(Float, default=0.0)
    category = Column(String, default="Cereals")
