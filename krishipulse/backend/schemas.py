"""
KrishiPulse - Pydantic Validation Schemas (schemas.py)
Author: Chetan (Mandya, Karnataka)
"""

from pydantic import BaseModel
from typing import Optional, List

# User Schemas
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

class UserLoginSchema(BaseModel):
    emailOrPhone: str
    password: str

class UserSignupSchema(BaseModel):
    name: str
    email: str
    phone: str
    district: str
    password: str

# Weather Schemas
class SprayingAdvisorySchema(BaseModel):
    status: str
    reason: str

class WeatherSchema(BaseModel):
    locationName: str
    currentTempC: int
    condition: str
    humidityPct: int
    windSpeedKmh: int
    rainfall24hMm: float
    sprayingAdvisory: SprayingAdvisorySchema

# APMC Market Schemas
class ArbitrageTargetSchema(BaseModel):
    mandiName: str
    modalPrice: int
    extraGainPerQuintal: int

class APMCPriceSchema(BaseModel):
    id: str
    cropName: str
    mandiName: str
    district: str
    modalPrice: int
    minPrice: int
    maxPrice: int
    arrivalQtyTonnes: float
    changePercent: float
    category: str
    arbitrageTarget: Optional[ArbitrageTargetSchema] = None

# Land Plot Schemas
class PlotSchema(BaseModel):
    id: str
    plotName: str
    areaAcres: float
    currentCrop: str
    growthStage: str
    healthScorePct: int
    totalExpensesRs: float
    expectedRevenueRs: float
    sowingDate: str
    expectedHarvestDate: str

    class Config:
        from_attributes = True
