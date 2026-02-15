from app.core.config import IMAGE_ROOT
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routes import pages
from app.routes import auth
from app.routes import gallery
from app.routes import news
from app.routes import courses
from app.routes import contact_info
from app.routes import admission
from app.routes import about

app = FastAPI(title="TCNursing Backend API")

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/images",
    StaticFiles(directory=IMAGE_ROOT),
    name="images"
)

# Include routers
app.include_router(pages.router)
app.include_router(auth.router)
app.include_router(gallery.router)
app.include_router(news.router)
app.include_router(courses.router)
app.include_router(contact_info.router)
app.include_router(admission.router)
app.include_router(about.router)