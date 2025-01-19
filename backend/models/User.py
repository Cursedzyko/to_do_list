from pydantic import BaseModel, EmailStr

class User(BaseModel):
    email: str
    password: str
    
class Task (BaseModel):
    title: str
    description: str
    category: str
    done: bool