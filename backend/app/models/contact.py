from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class ContactInfo(Base):
    __tablename__ = "contact_info"

    id = Column(Integer, primary_key=True, index=True)
    office_title = Column(String)
    office_address = Column(Text)
    office_phone = Column(String)
    office_mobile1 = Column(String)
    office_mobile2 = Column(String)
    website = Column(String)

    campus_title = Column(String)
    campus_address = Column(Text)
    campus_phone = Column(String)
    campus_mobile1 = Column(String)
    campus_mobile2 = Column(String)

    location_description = Column(Text)