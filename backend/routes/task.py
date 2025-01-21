from fastapi import APIRouter, HTTPException, Depends
from typing import List
from schemas.schemas import TaskCreate, TaskResponse
from database import Database
from utils.task import TaskCRUD
from utils.auth import get_current_user

task_router = APIRouter()

@task_router.post("/create_task", response_model=TaskResponse)
async def create_task(
    task: TaskCreate, current_user: dict = Depends(get_current_user)
):
    task_crud = TaskCRUD(Database.tasks_collection)
    task_data = task.dict()
    created_task = await task_crud.create_task(current_user["_id"], task_data)
    return TaskResponse(**created_task)


@task_router.get("/get_tasks", response_model=List[TaskResponse])
async def get_all_tasks(current_user: dict = Depends(get_current_user)):
    print(current_user["_id"])
    task_crud = TaskCRUD(Database.tasks_collection)
    tasks = await task_crud.get_all_tasks(current_user["_id"])
    return [TaskResponse(**task) for task in tasks]
