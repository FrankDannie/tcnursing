from fastapi import APIRouter, Depends, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.admission import Admission
import io

router = APIRouter()


@router.get("/api/admission")
def get_admission(db: Session = Depends(get_db)):
    admission = db.query(Admission).first()
    if not admission:
        return None

    return {
        "id": admission.id,
        "application_info": admission.application_info,
        "eligibility": admission.eligibility,
        "submission_documents": admission.submission_documents,
        "programme_details": admission.programme_details,
        "candidate_selection": admission.candidate_selection,
        "has_pdf": True if admission.application_pdf else False
    }


@router.post("/api/admission")
def create_admission(
    application_info: str = Form(...),
    eligibility: str = Form(...),
    submission_documents: str = Form(...),
    programme_details: str = Form(...),
    candidate_selection: str = Form(...),
    pdf: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    admission = Admission(
        application_info=application_info,
        eligibility=eligibility,
        submission_documents=submission_documents,
        programme_details=programme_details,
        candidate_selection=candidate_selection,
    )

    if pdf:
        admission.application_pdf = pdf.file.read()
        admission.application_pdf_name = pdf.filename

    db.add(admission)
    db.commit()
    db.refresh(admission)

    return {"message": "Created"}


@router.put("/api/admission/{id}")
def update_admission(
    id: int,
    application_info: str = Form(...),
    eligibility: str = Form(...),
    submission_documents: str = Form(...),
    programme_details: str = Form(...),
    candidate_selection: str = Form(...),
    pdf: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    admission = db.query(Admission).filter(Admission.id == id).first()

    admission.application_info = application_info
    admission.eligibility = eligibility
    admission.submission_documents = submission_documents
    admission.programme_details = programme_details
    admission.candidate_selection = candidate_selection

    if pdf:
        admission.application_pdf = pdf.file.read()
        admission.application_pdf_name = pdf.filename

    db.commit()
    db.refresh(admission)

    return {"message": "Updated"}


@router.get("/api/admission/download")
def download_pdf(db: Session = Depends(get_db)):
    admission = db.query(Admission).first()
    if not admission or not admission.application_pdf:
        return {"error": "No file found"}

    return StreamingResponse(
        io.BytesIO(admission.application_pdf),
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename={admission.application_pdf_name}"
        },
    )