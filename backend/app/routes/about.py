from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.about import About

router = APIRouter()


@router.get("/api/about")
def get_about(db: Session = Depends(get_db)):
    return db.query(About).first()


@router.post("/api/about")
def create_about(data: dict, db: Session = Depends(get_db)):
    about = About(**data)
    db.add(about)
    db.commit()
    db.refresh(about)
    return about


@router.put("/api/about/{id}")
def update_about(id: int, data: dict, db: Session = Depends(get_db)):
    about = db.query(About).filter(About.id == id).first()

    for key, value in data.items():
        setattr(about, key, value)

    db.commit()
    db.refresh(about)
    return about