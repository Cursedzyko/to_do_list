from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import connect_to_mongo, disconnect_from_mongo
from routes.singup import router
from routes.login import login_router
from routes.profile import profile_router
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()
    
@app.on_event("shutdown")
async def shutdown_event():
    await disconnect_from_mongo()

app.include_router(router, tags=["Authentication"] )
app.include_router(login_router, tags=["Login"])
app.include_router(profile_router, tags=["Profile"])

@app.get("/")
async def root():
    return {"hello" : "World!"}