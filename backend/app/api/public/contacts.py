"""Contact form endpoint."""

from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel, EmailStr

router = APIRouter()


class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    message: str
    subject: str | None = None


class ContactResponse(BaseModel):
    success: bool
    message: str


@router.post("", response_model=ContactResponse)
async def submit_contact(data: ContactRequest) -> ContactResponse:
    print(f"[{datetime.utcnow()}] Contact from {data.name} <{data.email}>: {data.message[:50]}")
    return ContactResponse(
        success=True,
        message="Votre message a bien été reçu. Je vous réponds sous 24-48h.",
    )
