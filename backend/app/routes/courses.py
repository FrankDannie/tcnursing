from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.course import Course
import json

router = APIRouter(prefix="/api/courses", tags=["Courses"])


@router.post("/")
def create_course(
    title: str = Form(...),
    subtitle: str = Form(...),
    duration: str = Form(...),
    council_no: str = Form(None),
    affiliation: str = Form(None),
    objectives: str = Form(None),  # JSON string
    program_details: str = Form(None),
    db: Session = Depends(get_db),
):
    course = Course(
        title=title,
        subtitle=subtitle,
        duration=duration,
        council_no=council_no,
        affiliation=affiliation,
        objectives=objectives,
        program_details=program_details,
    )

    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@router.get("/")
def get_courses(db: Session = Depends(get_db)):
    return db.query(Course).all()


@router.put("/{course_id}")
def update_course(
    course_id: int,
    title: str = Form(...),
    subtitle: str = Form(...),
    duration: str = Form(...),
    council_no: str = Form(None),
    affiliation: str = Form(None),
    objectives: str = Form(None),
    program_details: str = Form(None),
    db: Session = Depends(get_db),
):
    course = db.query(Course).filter(Course.id == course_id).first()

    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    course.title = title
    course.subtitle = subtitle
    course.duration = duration
    course.council_no = council_no
    course.affiliation = affiliation
    course.objectives = objectives
    course.program_details = program_details

    db.commit()
    db.refresh(course)
    return course


@router.delete("/{course_id}")
def delete_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if course:
        course.is_active = False
        db.commit()

    return {"message": "Deleted"}