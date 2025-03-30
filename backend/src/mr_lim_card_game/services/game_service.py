from typing import Dict
from uuid import uuid4
from ..models.game import GameState, Player


class GameService:
    """Service to manage game sessions and logic"""

    def __init__(self):
        self.sessions: Dict[str, GameState] = {}

    def create_session(self) -> str:
        session_id = str(uuid4())
        self.sessions[session_id] = GameState(
            session_id=session_id, players=[], state={})
        return session_id

    def add_player(self, session_id: str, player_name: str) -> Player:
        player = Player(id=str(uuid4()), name=player_name)
        self.sessions[session_id].players.append(player)
        return player

    def get_session(self, session_id: str) -> GameState:
        return self.sessions.get(session_id)


game_service = GameService()
