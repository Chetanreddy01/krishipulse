"""
KrishiPulse - Pydantic Validation Schemas (schemas.py)
Author: Chetan (Mandya, Karnataka)
"""

from pydantic import BaseModel
from typing import Optional, List

class UserSchema(BaseModel):
    id: str
    name: str
    email: str
    phone: str
    role: str
    district: str
    farmSizeAcres: float

    class Config:
        from_attributes = True

class PlotSchema(BaseModel):
    id: str
    plotName: str
    district: str
    areaAcres: float
    currentCrop: str
    sowingDate: Optional[str] = None
    expectedHarvestDate: Optional[str] = None
    growthStage: str
    healthScorePct: int
    totalExpensesRs: float
    expectedRevenueRs: float

    class Config:
        from_attributes = True

class APMCPriceSchema(BaseModel):
    id: str
    cropName: str
    mandiName: str
    district: str
    modalPrice: float
    minPrice: float
    maxPrice: float
    arrivalQtyTonnes: float
    changePercent: float
    category: str

    class Config:
        from_attributes = True

class WeatherSchema(BaseModel):
    locationName: str
    currentTempC: int
    condition: str
    humidityPct: int
    windSpeedKmh: int
    rainfall24hMm: float
    sprayingAdvisory: dict
