from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contact import ContactInfo

router = APIRouter()

@router.get("/api/contact-info")
def get_contact_info(db: Session = Depends(get_db)):
    return db.query(ContactInfo).first()

@router.post("/api/contact-info")
def create_contact_info(data: dict, db: Session = Depends(get_db)):
    contact = ContactInfo(**data)
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact