from pydantic import BaseModel
from typing import List

class ImageListResponse(BaseModel):
    images: List[str]
