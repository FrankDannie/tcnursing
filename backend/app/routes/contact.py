from fastapi import APIRouter
from pydantic import BaseModel, EmailStr
import smtplib
from email.message import EmailMessage

router = APIRouter()

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str | None = None
    message: str

@router.post("/api/contact")
async def send_contact(form: ContactForm):
    msg = EmailMessage()
    msg["Subject"] = "New Contact Form Submission"
    msg["From"] = "yourgmail@gmail.com"
    msg["To"] = "yourgmail@gmail.com"

    msg.set_content(f"""
    Name: {form.name}
    Email: {form.email}
    Phone: {form.phone}

    Message:
    {form.message}
    """)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as smtp:
        smtp.login("yourgmail@gmail.com", "your_app_password")
        smtp.send_message(msg)

    return {"message": "Email sent successfully"}