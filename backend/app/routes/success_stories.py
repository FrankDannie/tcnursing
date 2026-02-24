from app.core.config import IMAGE_ROOT
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from uuid import uuid4
import os
import shutil

from app.database import get_db
from app.models.success_story import SuccessStory
from app.schemas.success_story import SuccessStoryResponse

router = APIRouter(prefix="/success-stories", tags=["Success Stories"])

UPLOAD_DIR = os.path.join(IMAGE_ROOT, "success_stories")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/", response_model=SuccessStoryResponse)
def create_success_story(
    name: str = Form(...),
    degree: str = Form(...),
    academic_year: str = Form(None),
    current_hospital: str = Form(None),
    city_in_germany: str = Form(None),
    short_story: str = Form(None),
    start_year: str = Form(None),
    moved_year: str = Form(None),
    display_order: int = Form(0),
    is_active: bool = Form(True),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):

    photo_url = None

    if photo:
        filename = f"{uuid4()}_{photo.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)

        photo_url = f"/images/success_stories/{filename}"

    story = SuccessStory(
        name=name,
        degree=degree,
        academic_year=academic_year,
        current_hospital=current_hospital,
        city_in_germany=city_in_germany,
        short_story=short_story,
        start_year=start_year,
        moved_year=moved_year,
        display_order=display_order,
        is_active=is_active,
        photo_url=photo_url
    )

    db.add(story)
    db.commit()
    db.refresh(story)

    return story


@router.get("/", response_model=list[SuccessStoryResponse])
def get_success_stories(db: Session = Depends(get_db)):
    return db.query(SuccessStory)\
        .filter(SuccessStory.is_active == True)\
        .order_by(SuccessStory.display_order.asc())\
        .all()


@router.delete("/{story_id}")
def delete_success_story(story_id: str, db: Session = Depends(get_db)):
    story = db.query(SuccessStory).get(story_id)
    db.delete(story)
    db.commit()
    return {"message": "Deleted successfully"}

@router.put("/{story_id}", response_model=SuccessStoryResponse)
def update_success_story(
    story_id: str,
    name: str = Form(...),
    degree: str = Form(...),
    academic_year: str = Form(None),
    current_hospital: str = Form(None),
    city_in_germany: str = Form(None),
    short_story: str = Form(None),
    start_year: str = Form(None),
    moved_year: str = Form(None),
    display_order: int = Form(0),
    is_active: bool = Form(True),
    photo: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    story = db.query(SuccessStory).get(story_id)

    if not story:
        return {"error": "Story not found"}

    # -------------------------
    # Handle Photo Replacement
    # -------------------------
    if photo:
        # Delete old file if exists
        if story.photo_url:
            old_filename = story.photo_url.split("/")[-1]
            old_filepath = os.path.join(UPLOAD_DIR, old_filename)

            if os.path.exists(old_filepath):
                os.remove(old_filepath)

        # Save new file
        filename = f"{uuid4()}_{photo.filename}"
        filepath = os.path.join(UPLOAD_DIR, filename)

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(photo.file, buffer)

        story.photo_url = f"/images/success_stories/{filename}"

    # -------------------------
    # Update Fields
    # -------------------------
    story.name = name
    story.degree = degree
    story.academic_year = academic_year
    story.current_hospital = current_hospital
    story.city_in_germany = city_in_germany
    story.short_story = short_story
    story.start_year = start_year
    story.moved_year = moved_year
    story.display_order = display_order
    story.is_active = is_active

    db.commit()
    db.refresh(story)

    return story