from pydantic import BaseModel
from typing import Optional

class ContactForm(BaseModel):
    name: str
    phone: str
    message: Optional[str] = None
