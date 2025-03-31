"""
API Endpoints game management
"""

from fastapi import APIRouter, HTTPException, Depends
from mr_lim_card_game.services.game_service import GameService
from mr_lim_card_game.dependencies import get_game_service
from mr_lim_card_game.models.game_route import PlayerAdd

router = APIRouter()


@router.post("/create-game", name="create_game")
async def create_game(game_service: GameService = Depends(get_game_service)):
    """Create a new game session"""
    session_id = await game_service.create_session()
    if not session_id:
        raise HTTPException(status_code=500, detail="Failed to create session")
    return {"session_id": session_id}


@router.post("/add-player", name="add_player")
async def add_player(payload: PlayerAdd, game_service: GameService = Depends(get_game_service)):
    """Add a player to a game session"""
    session_id = payload.session_id
    player_name = payload.name
    if not session_id or not player_name:
        raise HTTPException(status_code=400, detail="session_id and player_name are required")
    session = await game_service.get_session_info(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    player = await game_service.add_player(session_id, player_name)
    return {"player": player}


@router.get("/get-info/{session_id}")
async def get_session_info(session_id: str, game_service: GameService = Depends(get_game_service)):
    """Get info in a game session"""
    session = await game_service.get_session_info(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"session_info": session}


@router.get("/list-sessions")
async def list_sessions(game_service: GameService = Depends(get_game_service)):
    """List all active game sessions"""
    sessions = await game_service.list_sessions()
    return {"sessions": sessions}


@router.delete("/delete-session/{session_id}")
async def delete_session(session_id: str, game_service: GameService = Depends(get_game_service)):
    """Delete a game session"""
    session = await game_service.get_session_info(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    await game_service.remove_session(session_id)
    return {"detail": f"Session {session_id} deleted successfully"}
