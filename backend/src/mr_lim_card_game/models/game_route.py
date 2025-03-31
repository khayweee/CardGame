from pydantic import BaseModel, Field


class PlayerAdd(BaseModel):
    """Represents a player to be added to the game"""
    name: str = Field(..., min_length=1, max_length=10)
    session_id: str = Field(..., min_length=6, max_length=6)
