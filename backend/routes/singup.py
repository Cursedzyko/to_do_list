from models.User import User
from fastapi import APIRouter, HTTPException, status
from database import Database
from utils.auth import pwd_content

router = APIRouter()


@router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: User):
    try:
        print(user)  # This should print if user data is valid
    except Exception as e:
        print(f"Error processing user data: {e}")
    if not user.email or not user.password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Both email and password are required!"
        )
        
    existing_user = await Database.user_collections.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists.",
        )
    
    hashed_password = pwd_content.hash(user.password)
    
    new_user = {
        "email" : user.email,
        "password": hashed_password
    }
    
    await Database.user_collections.insert_one(new_user)
    
    return {"message": "User created successfully, now sign in"}