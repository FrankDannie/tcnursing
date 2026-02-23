from app.core.auth import create_access_token
from app.database import SessionLocal
from app.models.admin import Admin
from fastapi import APIRouter, HTTPException

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/login")
def login(data: dict):
    db = SessionLocal()

    admin = db.query(Admin).filter(Admin.username == data["username"]).first()

    if not admin:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token({"sub": admin.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": 1800  # 30 minutes in seconds
    }



@router.post("/create")
def create_admin(data: dict):
    db = SessionLocal()
    admin = Admin(
        username=data["username"],
        password=data["password"]
    )
    db.add(admin)
    db.commit()
    return {"status": "admin created"}

