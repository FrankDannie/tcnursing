# models/admission.py

from sqlalchemy import Column, Integer, Text, LargeBinary, String
from app.database import Base

class Admission(Base):
    __tablename__ = "admission"

    id = Column(Integer, primary_key=True, index=True)

    application_info = Column(Text)
    eligibility = Column(Text)
    submission_documents = Column(Text)
    programme_details = Column(Text)
    candidate_selection = Column(Text)

    # PDF storage
    application_pdf = Column(LargeBinary)
    application_pdf_name = Column(String)