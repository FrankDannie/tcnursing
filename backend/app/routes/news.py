from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.news import News
import os
import shutil

router = APIRouter(prefix="/api/news", tags=["News"])

UPLOAD_DIR = "app/static/images/news"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
def create_news(
    title: str = Form(...),
    content: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    image_name = None

    if image:
        image_name = image.filename
        with open(os.path.join(UPLOAD_DIR, image_name), "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

    news = News(title=title, content=content, image=image_name)
    db.add(news)
    db.commit()
    db.refresh(news)

    return news


@router.get("/")
def get_all_news(db: Session = Depends(get_db)):
    return db.query(News).filter(News.is_active == True).order_by(News.created_at.desc()).all()


@router.delete("/{news_id}")
def delete_news(news_id: int, db: Session = Depends(get_db)):
    news = db.query(News).filter(News.id == news_id).first()
    if news:
        db.delete(news)
        db.commit()
    return {"message": "Deleted"}

@router.put("/{news_id}")
def update_news(
    news_id: int,
    title: str = Form(...),
    content: str = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    news = db.query(News).filter(News.id == news_id).first()

    if not news:
        return {"error": "News not found"}

    # Update text fields
    news.title = title
    news.content = content

    # If new image uploaded
    if image:
        image_name = image.filename

        # Optional: delete old image
        if news.image:
            old_path = os.path.join(UPLOAD_DIR, news.image)
            if os.path.exists(old_path):
                os.remove(old_path)

        # Save new image
        with open(os.path.join(UPLOAD_DIR, image_name), "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        news.image = image_name

    db.commit()
    db.refresh(news)

    return news