from typing import Dict
from uuid import uuid4
from mr_lim_card_game.models.game import GameState, Player
from .game_state_manager import GameStateManager
from mr_lim_card_game.utils.id_generator import generate_session_id
import asyncio
from fastapi import WebSocket
from .connection_manager import ConnectionManager


class SessionManager:
    """
    Manage active game sessions with async operations
    """

    def __init__(self):
        """Initialize the session manager"""
        # Dictionary to hold game sessions
        self.active_sessions: Dict[str, GameState] = {}
        self.lock = asyncio.Lock()

    async def add_session(self, session_id: str, game_state: GameState):
        """
        Add a new session
        """
        async with self.lock:
            self.active_sessions[session_id] = game_state

    async def get_session(self, session_id: str) -> GameState:
        """Get a session by ID"""
        async with self.lock:
            return self.active_sessions.get(session_id, None)

    async def remove_session(self, session_id: str):
        """Remove a session"""
        async with self.lock:
            if session_id in self.active_sessions:
                del self.active_sessions[session_id]

    async def list_sessions(self) -> Dict[str, GameState]:
        """List all active game sessions"""
        async with self.lock:
            return dict(self.active_sessions)


class GameService:
    """Service to manage game sessions and logic"""

    def __init__(self):
        """Initialize the game service"""
        self.sessions: SessionManager = SessionManager()
        self.connection_manager = ConnectionManager()  # Use ConnectionManager

    async def create_session(self) -> str:
        """Create a new game session and return its ID if successfully added"""
        session_id = generate_session_id()
        game_state = GameState(session_id=session_id, players=[], state={})
        await self.sessions.add_session(session_id=session_id, game_state=game_state)
        print(self.sessions.active_sessions)
        session = await self.sessions.get_session(session_id)
        if session:
            return session_id
        raise RuntimeError("Failed to create session")

    async def add_player(self, session_id: str, player_name: str) -> Player:
        """Add a player to a game session"""
        session = await self.sessions.get_session(session_id)
        if not session:
            raise ValueError(f"Not found Session: {session_id}")
        game_state_manager = GameStateManager(session)
        player = Player(id=str(uuid4()), name=player_name)
        game_state_manager.add_player(player)
        return player

    async def update_game_state(self, session_id: str, key: str, value):
        """Update the game state for a session"""
        session = await self.sessions.get_session(session_id)
        if not session:
            raise ValueError("Session not found")
        game_state_manager = GameStateManager(session)
        game_state_manager.update_state(key, value)

    async def get_session_info(self, session_id: str) -> GameState:
        """Retrieve session information"""

        session = await self.sessions.get_session(session_id)
        if not session:
            return None
        return session

    async def list_sessions(self) -> Dict[str, GameState]:
        """List all active game sessions"""
        return await self.sessions.list_sessions()

    async def remove_session(self, session_id: str):
        """Remove a session"""
        session = await self.sessions.get_session(session_id)
        if not session:
            raise ValueError(f"Session not found: {session_id}")
        await self.sessions.remove_session(session_id)

    async def connect(self, websocket: WebSocket, session_id: str, player_id: str):
        await websocket.accept()
        await self.connection_manager.add_connection(session_id, player_id, websocket)

    async def disconnect(self, websocket: WebSocket, session_id: str, player_id: str):
        await self.connection_manager.remove_connection(session_id, player_id)

    async def broadcast(self, session_id: str, message: str):
        await self.connection_manager.broadcast(session_id, message)
