# models/about.py

from sqlalchemy import Column, Integer, Text
from app.database import Base

class About(Base):
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)

    founder_text = Column(Text)
    vice_chairman_text = Column(Text)
    history = Column(Text)
    philosophy = Column(Text)
    college_aims = Column(Text)