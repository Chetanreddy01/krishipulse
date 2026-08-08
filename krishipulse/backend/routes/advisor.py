"""
KrishiPulse - Crop Advisor Router (routes/advisor.py)
Author: Chetan (Mandya, Karnataka)
Description: Serves Karnataka 31-district agricultural crop & soil recommendations from JSON data.
"""

import json
import os
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/advisor", tags=["Crop Advisor"])

# Path to Karnataka District Crops JSON file
DATA_FILE_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "karnataka_district_crops.json")

def load_district_data():
    """
    Helper function to load the 31 Karnataka district crop records from the static JSON file.
    """
    if os.path.exists(DATA_FILE_PATH):
        with open(DATA_FILE_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

@router.get("/districts")
def get_all_districts():
    """
    Returns the complete list of all 31 Karnataka districts with soil, season, and major crops.
    """
    return load_district_data()

@router.get("/district/{district_name}")
def get_district_crop_info(district_name: str):
    """
    Returns crop recommendation data for a specific Karnataka district (e.g. Mandya, Kalaburagi).
    """
    data = load_district_data()
    for item in data:
        if item["district"].lower() == district_name.lower():
            return item
    raise HTTPException(status_code=404, detail=f"District '{district_name}' not found in Karnataka dataset.")
