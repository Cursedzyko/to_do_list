from fastapi import APIRouter, HTTPException, status
from database import Database
from utils.auth import pwd_content
from schemas.schemas import UserCreate
from models.User import UserModel
from utils.auth import create_token

login_router = APIRouter()

@login_router.post("/login")
async def login(user: UserCreate):
    db_user = await Database.user_collections.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    if not pwd_content.verify(user.password, db_user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    access_token = await create_token(data={"sub": db_user["email"]})
    
    return {"access_token": access_token, "token_type": "bearer"}

