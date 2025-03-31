"""
Data Models for entities in the game
"""

from pydantic import BaseModel
from typing import List
from datetime import datetime


class Player(BaseModel):
    """Represents a player in the game"""

    id: str
    name: str
    date_joined: datetime = datetime.now()


class GameState(BaseModel):
    """Represents the state of the game"""

    session_id: str
    players: List[Player]
    state: dict
    date_created: datetime = datetime.now()
