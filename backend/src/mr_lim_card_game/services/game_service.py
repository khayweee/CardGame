from typing import Dict
from uuid import uuid4
from ..models.game import GameState, Player
from .game_state_manager import GameStateManager


class SessionManager:
    """
    Manage active game sessions
    TODO: Impletement scalable session management (e.g., using a database)
    TODO: Implement session expiration and cleanup
    """

    def __init__(self):
        """Initialize the session manager"""
        # Dictionary to hold game sessions
        self.active_sessions: Dict[str, GameState] = {}

    def add_session(self, session_id: str, game_state: GameState):
        """
        Add a new session
        TODO: Implement logic for adding a session
        """
        self.active_sessions[session_id] = game_state

    def get_session(self, session_id: str) -> GameState:
        """Get a session by ID"""
        return self.active_sessions.get(session_id)

    def remove_session(self, session_id: str):
        """Remove a session"""
        if session_id in self.active_sessions:
            del self.active_sessions[session_id]


class GameService:
    """Service to manage game sessions and logic"""

    def __init__(self):
        """Initialize the game service"""
        self.sessions: SessionManager = SessionManager()

    def create_session(self) -> str:
        """Create a new game session and return its ID"""
        session_id = str(uuid4())
        game_state = GameState(session_id=session_id, players=[], state={})
        self.sessions.add_session(session_id=session_id, game_state=game_state)
        return session_id

    def add_player(self, session_id: str, player_name: str) -> Player:
        """Add a player to a game session"""
        session = self.sessions.get_session(session_id)
        if not session:
            raise ValueError(f"Not found Session: {session_id}")
        game_state_manager = GameStateManager(session)
        player = Player(id=str(uuid4()), name=player_name)
        game_state_manager.add_player(player)
        return player

    def update_game_state(self, session_id: str, key: str, value):
        """Update the game state for a session"""
        session = self.sessions.get_session(session_id)
        if not session:
            raise ValueError("Session not found")
        game_state_manager = GameStateManager(session)
        game_state_manager.update_state(key, value)

    def get_session_info(self, session_id: str) -> GameState:
        """Retrieve session information"""
        return self.sessions.get_session(session_id)
