from pydantic import BaseModel
from typing import Optional, List


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

class UpdateTask(TaskBase):
    title: Optional[str]
    description: Optional[str]
    category: Optional[str]
    done: Optional[bool]
class TaskResponse(TaskBase):
    id : str
    user_id: Optional[str]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
        
class TaskListResp(BaseModel):
    tasks: List[TaskResponse]
    email: str