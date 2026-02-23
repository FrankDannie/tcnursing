from sqlalchemy import Column, String, Text, Boolean, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid

from app.database import Base

class SuccessStory(Base):
    __tablename__ = "success_stories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    photo_url = Column(Text, nullable=True)
    degree = Column(String, nullable=False)
    academic_year = Column(String, nullable=True)
    current_hospital = Column(String, nullable=True)
    city_in_germany = Column(String, nullable=True)
    short_story = Column(Text, nullable=True)
    start_year = Column(String, nullable=True)
    moved_year = Column(String, nullable=True)
    display_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())