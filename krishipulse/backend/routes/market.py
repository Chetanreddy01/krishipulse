"""
KrishiPulse - Market Intelligence Router (routes/market.py)
Author: Chetan (Mandya, Karnataka)
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import crud, database, schemas

router = APIRouter(prefix="/api/market", tags=["Market Intelligence"])

@router.get("/prices", response_model=List[schemas.APMCPriceSchema])
def read_apmc_prices(district: str = "Mandya", db: Session = Depends(database.get_db)):
    prices = crud.get_apmc_prices(db, district=district)
    return [
        {
            "id": p.id,
            "cropName": p.crop_name,
            "mandiName": p.mandi_name,
            "district": p.district,
            "modalPrice": p.modal_price,
            "minPrice": p.min_price,
            "maxPrice": p.max_price,
            "arrivalQtyTonnes": p.arrival_qty_tonnes,
            "changePercent": p.change_percent,
            "category": p.category
        }
        for p in prices
    ]
