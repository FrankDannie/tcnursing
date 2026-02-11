from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Admin(Base):
    __tablename__ = "admins"
    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)
    password = Column(String)
