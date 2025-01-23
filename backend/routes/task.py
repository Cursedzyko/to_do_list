from fastapi import APIRouter, HTTPException, Depends
from typing import List
from schemas.schemas import TaskCreate, TaskResponse, UpdateTask, TaskListResp
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


@task_router.get("/get_tasks", response_model=TaskListResp)
async def get_all_tasks(current_user: dict = Depends(get_current_user)):
    task_crud = TaskCRUD(Database.tasks_collection)
    tasks = await task_crud.get_all_tasks(current_user["_id"])
    return {"tasks": [TaskResponse(**task) for task in tasks], "email": current_user["email"]}


@task_router.delete("/delete_task/{task_id}", status_code=204)
async def delete_task(
    task_id: str, current_user: dict = Depends(get_current_user)
):
    task_crud = TaskCRUD(Database.tasks_collection)
    deleted_count = await task_crud.delete_task(current_user["_id"], task_id)
    if not deleted_count:
        raise HTTPException(status_code=404, detail="Task not found or not authorized to delete")
    
@task_router.put("/update_task/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: str, task: UpdateTask, current_user: dict = Depends(get_current_user)
):
    task_crud = TaskCRUD(Database.tasks_collection)
    task_data = task.dict()
    updated_task = await task_crud.update_task(current_user["_id"], task_id, task_data)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found or not authorized to update")
    return TaskResponse(**updated_task)
