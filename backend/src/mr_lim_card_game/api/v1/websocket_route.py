from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from ...services.game_service import GameService

router = APIRouter()
game_service = GameService()


@router.websocket("/ws/{session_id}/{player_id}")
async def websocket_endpoint(websocket: WebSocket, session_id: str, player_id: str):
    await game_service.connect(websocket, session_id, player_id)
    try:
        while True:
            data = await websocket.receive_text()
            await game_service.broadcast(session_id, data)
    except WebSocketDisconnect:
        await game_service.disconnect(websocket, session_id, player_id)
