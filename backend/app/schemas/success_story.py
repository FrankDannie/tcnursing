from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class SuccessStoryBase(BaseModel):
    name: str
    degree: str
    academic_year: Optional[str] = None
    current_hospital: Optional[str] = None
    city_in_germany: Optional[str] = None
    short_story: Optional[str] = None
    start_year: Optional[str] = None
    moved_year: Optional[str] = None
    display_order: Optional[int] = 0
    is_active: Optional[bool] = True

class SuccessStoryCreate(SuccessStoryBase):
    pass

class SuccessStoryResponse(SuccessStoryBase):
    id: UUID
    photo_url: Optional[str]

    class Config:
        from_attributes = True