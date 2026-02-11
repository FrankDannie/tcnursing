import os
import shutil
from fastapi import UploadFile, HTTPException
from app.core.config import IMAGE_ROOT, SCREENS

def screen_path(screen: str) -> str:
    if screen not in SCREENS:
        raise HTTPException(404, "Invalid screen")

    path = os.path.join(IMAGE_ROOT, screen)
    os.makedirs(path, exist_ok=True)
    return path


def list_images(screen: str):
    path = screen_path(screen)
    return sorted(os.listdir(path))


def save_image(screen: str, file: UploadFile):
    path = screen_path(screen)

    # single image screens
    if SCREENS[screen]["single"]:
        shutil.rmtree(path)
        os.makedirs(path)

    existing = list_images(screen)
    idx = len(existing) + 1
    ext = file.filename.split(".")[-1]

    filename = f"img_{idx}.{ext}"
    full_path = os.path.join(path, filename)

    with open(full_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    return filename


def delete_image(screen: str, name: str):
    path = screen_path(screen)
    file_path = os.path.join(path, name)

    if not os.path.exists(file_path):
        raise HTTPException(404, "Image not found")

    os.remove(file_path)
