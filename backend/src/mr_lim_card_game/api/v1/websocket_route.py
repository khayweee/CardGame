from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from mr_lim_card_game.services.game_service import GameService
from mr_lim_card_game.dependencies import get_game_service

router = APIRouter()


@router.websocket("/ws/{session_id}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, player_id: str, game_service: GameService = Depends(get_game_service)):
    await game_service.connect(websocket, session_id, player_id)
    try:
        while True:
            data = await websocket.receive_text()
            await game_service.broadcast(session_id, data)
    except WebSocketDisconnect:
        await game_service.disconnect(websocket, session_id, player_id)
