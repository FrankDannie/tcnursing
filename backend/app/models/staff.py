from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Staff(Base):
    __tablename__ = "staff"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    description = Column(Text)
    image = Column(String)