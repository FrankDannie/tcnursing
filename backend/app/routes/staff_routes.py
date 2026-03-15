from app.core.config import IMAGE_ROOT
from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
import shutil
import os

from app.database import SessionLocal
from app.schemas.staff_schema import StaffCreate
from app.crud.staff_crud import *
from app.models.staff import Staff

router = APIRouter(prefix="/api/staff", tags=["Staff"])

UPLOAD_DIR = os.path.join(IMAGE_ROOT, "staff")
os.makedirs(UPLOAD_DIR, exist_ok=True)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def list_staff(db: Session = Depends(get_db)):
    return get_staff(db)


@router.post("/")
async def create_staff_route(
    name: str = Form(...),
    role: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    image_path = os.path.join(UPLOAD_DIR, image.filename)

    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    staff = StaffCreate(name=name, role=role, description=description)

    return create_staff(db, staff, image.filename)


@router.put("/{staff_id}")
def update_staff_route(
    staff_id: int,
    staff: StaffCreate,
    db: Session = Depends(get_db)
):
    return update_staff(db, staff_id, staff)


@router.delete("/{staff_id}")
def delete_staff_route(
    staff_id: int,
    db: Session = Depends(get_db)
):
    return delete_staff(db, staff_id)