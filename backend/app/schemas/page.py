from pydantic import BaseModel

class PageBase(BaseModel):
    title: str
    slug: str
    content: str

class PageCreate(PageBase):
    pass

class PageOut(PageBase):
    id: int
    class Config:
        orm_mode = True
