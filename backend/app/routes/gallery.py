from fastapi import APIRouter, UploadFile, File
from app.crud import gallery as service

router = APIRouter(prefix="/api/gallery", tags=["Gallery"])


@router.get("/{screen}")
def get_images(screen: str):
    return service.list_images(screen)


@router.post("/{screen}")
def upload_image(screen: str, image: UploadFile = File(...)):
    return {"filename": service.save_image(screen, image)}


@router.delete("/{screen}/{name}")
def remove_image(screen: str, name: str):
    service.delete_image(screen, name)
    return {"status": "deleted"}
