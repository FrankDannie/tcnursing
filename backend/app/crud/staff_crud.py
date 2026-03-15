from sqlalchemy.orm import Session
from app.models.staff import Staff
from app.schemas.staff_schema import StaffCreate

def create_staff(db: Session, staff: StaffCreate, image_name: str):
    db_staff = Staff(
        name=staff.name,
        role=staff.role,
        description=staff.description,
        image=image_name
    )

    db.add(db_staff)
    db.commit()
    db.refresh(db_staff)

    return db_staff


def get_staff(db: Session):
    return db.query(Staff).all()


def get_staff_by_id(db: Session, staff_id: int):
    return db.query(Staff).filter(Staff.id == staff_id).first()


def update_staff(db: Session, staff_id: int, staff: StaffCreate):
    db_staff = db.query(Staff).filter(Staff.id == staff_id).first()

    db_staff.name = staff.name
    db_staff.role = staff.role
    db_staff.description = staff.description

    db.commit()
    db.refresh(db_staff)

    return db_staff


def delete_staff(db: Session, staff_id: int):
    db_staff = db.query(Staff).filter(Staff.id == staff_id).first()

    db.delete(db_staff)
    db.commit()

    return {"message": "Staff deleted"}