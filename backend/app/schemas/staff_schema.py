from pydantic import BaseModel

class StaffBase(BaseModel):
    name: str
    role: str
    description: str

class StaffCreate(StaffBase):
    pass

class StaffResponse(StaffBase):
    id: int
    image: str

    class Config:
        from_attributes = True