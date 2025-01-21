from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str

    class Config:
        orm_mode = True

class TaskBase(BaseModel):
    title: str
    description: str
    category: str
    done: bool

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id : str
    user_id: str

    class Config:
        orm_mode = True
        allow_population_by_field_name = True