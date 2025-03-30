"""
API Endpoints game management
"""
from fastapi import APIRouter, HTTPException
from ...services.game_service import game_service

router = APIRouter()


@router.post("/create-session")
def create_session():
    """Create a new game session"""
    session_id = game_service.create_session()
    return {"session_id": session_id}


@router.post("/add-player/{session_id}")
def add_player(session_id: str, player_name: str):
    """Add a player to a game session"""
    session = game_service.get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    player = game_service.add_player(session_id, player_name)
    return {"player": player}
