from bson import ObjectId
from typing import Optional

class UserModel:
    def __init__(self, email: str, password: str, id: Optional[ObjectId] = None):
        self.id = id
        self.email = email
        self.password = password

    def to_dict(self):
        return {
            "id": str(self.id) if self.id else None,
            "email": self.email,
            "password": self.password
        }
