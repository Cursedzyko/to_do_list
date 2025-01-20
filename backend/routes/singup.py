from fastapi import APIRouter, HTTPException, status
from database import Database
from utils.auth import pwd_content
from schemas.schemas import UserCreate, UserResponse
from models.User import UserModel

router = APIRouter()

@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=UserResponse)
async def signup(user: UserCreate):
    # Check if user already exists in the database
    existing_user = await Database.user_collections.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists.",
        )

    hashed_password = pwd_content.hash(user.password)

    new_user = UserModel(email=user.email, password=hashed_password)

    result = await Database.user_collections.insert_one(new_user.to_dict())

    return UserResponse(id=str(result.inserted_id), email=user.email)
