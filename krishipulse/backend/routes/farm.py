"""
KrishiPulse - Farm Management Router (routes/farm.py)
Author: Chetan (Mandya, Karnataka)
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
import crud, database, schemas

router = APIRouter(prefix="/api/farm", tags=["Farm Management"])

@router.get("/plots", response_model=List[schemas.PlotSchema])
def read_farm_plots(db: Session = Depends(database.get_db)):
    plots = crud.get_farm_plots(db)
    return [
        {
            "id": p.id,
            "plotName": p.plot_name,
            "district": p.district,
            "areaAcres": p.area_acres,
            "currentCrop": p.current_crop,
            "sowingDate": p.sowing_date,
            "expectedHarvestDate": p.expected_harvest_date,
            "growthStage": p.growth_stage,
            "healthScorePct": p.health_score_pct,
            "totalExpensesRs": p.total_expenses_rs,
            "expectedRevenueRs": p.expected_revenue_rs
        }
        for p in plots
    ]
