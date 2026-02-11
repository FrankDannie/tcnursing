import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

IMAGE_ROOT = os.path.join(BASE_DIR, "static", "images")

SCREENS = {
    "home": {"single": False},
    "campus_facilities": {"single": False},
    "about_founder": {"single": True},
    "chairman": {"single": True},
}
