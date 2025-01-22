from motor.motor_asyncio import AsyncIOMotorCollection
from datetime import datetime
from typing import Optional, List
from bson.objectid import ObjectId


class TaskCRUD:
    def __init__(self, collection: AsyncIOMotorCollection):
        self.collection = collection
        
    async def create_task(self, user_id: str,task_data: dict) -> dict:
        task_data["user_id"] = str(user_id)
        task_data["created_at"] = datetime.now()
        task_data["updated_at"] = datetime.now()
        result = await self.collection.insert_one(task_data)
        task_data["id"] = str(result.inserted_id)
        return task_data
    
    async def get_task(self, user_id: str,task_id: str) -> Optional[dict]:
        task = await self.collection.find_one(
            {"_id": ObjectId(task_id), "user_id": user_id}  # Fetch task for the specific user
        )
        if task:
            task["id"] = str(task.pop("_id"))
        return task
    
    async def get_all_tasks(self, user_id: str) -> List[dict]:
        tasks = []
        async for task in self.collection.find({"user_id": str(user_id)}):
            task["id"] = str(task.pop("_id"))
            task["user_id"] = str(task["user_id"])
            tasks.append(task)
        return tasks
    
    async def delete_task(self, user_id: str, task_id: str) -> int:
        print(user_id)
        print(type(user_id))
        print(task_id)
        print(type(task_id))
        result = await self.collection.delete_one(
            {"_id": ObjectId(task_id), "user_id": str(user_id)}
        )
        print(result.deleted_count)
        return result.deleted_count