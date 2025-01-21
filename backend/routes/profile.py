from fastapi import APIRouter, Depends
from utils.auth import get_current_user

profile_router = APIRouter()


@profile_router.get("/profile")
async def read_profile(current_user: dict = Depends(get_current_user)):
    return {"email": current_user['email']}
