from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from app.database import Base
from datetime import datetime

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    subtitle = Column(String(255))
    duration = Column(String(100))
    council_no = Column(String(100), nullable=True)
    affiliation = Column(Text, nullable=True)
    objectives = Column(Text, nullable=True)  # store as JSON string
    program_details = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)