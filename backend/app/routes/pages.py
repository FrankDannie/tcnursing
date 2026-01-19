from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.models.page import Page
from app.schemas.page import PageCreate, PageOut
from app.database import get_db

router = APIRouter(prefix="/pages", tags=["pages"])

@router.get("/", response_model=List[PageOut])
def list_pages(db: Session = Depends(get_db)):
    return db.query(Page).all()

@router.post("/", response_model=PageOut)
def create_page(page: PageCreate, db: Session = Depends(get_db)):
    db_page = Page(**page.dict())
    db.add(db_page)
    db.commit()
    db.refresh(db_page)
    return db_page

@router.put("/{page_id}", response_model=PageOut)
def update_page(page_id: int, page: PageCreate, db: Session = Depends(get_db)):
    db_page = db.query(Page).filter(Page.id == page_id).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    db_page.title = page.title
    db_page.slug = page.slug
    db_page.content = page.content
    db.commit()
    db.refresh(db_page)
    return db_page

@router.delete("/{page_id}")
def delete_page(page_id: int, db: Session = Depends(get_db)):
    db_page = db.query(Page).filter(Page.id == page_id).first()
    if not db_page:
        raise HTTPException(status_code=404, detail="Page not found")
    db.delete(db_page)
    db.commit()
    return {"detail": "Page deleted"}
