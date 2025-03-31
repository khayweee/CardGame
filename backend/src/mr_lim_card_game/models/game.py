"""
Data Models for entities in the game
"""

from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


class Player(BaseModel):
    """Represents a player in the game"""

    id: str
    name: str
    date_joined: datetime = datetime.now()


class GameState(BaseModel):
    """Represents the state of the game"""

    session_id: str = Field(..., min_length=6, max_length=6)
    players: List[Player]
    state: dict
    date_created: datetime = datetime.now()
