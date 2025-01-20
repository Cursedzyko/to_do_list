from passlib.context import CryptContext
from datetime import datetime, timedelta
import os
from dotenv  import load_dotenv
import jwt

load_dotenv()

SECRET_KEY= os.getenv("SECRET_KEY")
ALGORITHM= os.getenv("ALGORITHM")

EXPIRY_TIME= os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")

pwd_content = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def create_token(data: dict, expires_delta: timedelta = timedelta(int(EXPIRY_TIME))):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
    