from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class NewsCreate(BaseModel):
    title: str
    content: str

class NewsResponse(BaseModel):
    id: int
    title: str
    content: str
    image: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True