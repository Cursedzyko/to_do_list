import os
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient


load_dotenv()

MONGO_URL= os.getenv("MONGO_URL")
DB_NAME= os.getenv("DB_NAME")

class Database:
    client = None
    db = None
    user_collections = None
    tasks_collection = None

async def connect_to_mongo():
    Database.client = AsyncIOMotorClient(MONGO_URL)
    Database.db = Database.client[DB_NAME]
    
    Database.user_collections = Database.db["users"]
    Database.tasks_collection = Database.db["tasks"]
    
    print("Successfully connected to MongoDB!")
    
async def disconnect_from_mongo():
    if Database.client:
        await Database.client.close()
        print("Disconnected from MOngoDB")