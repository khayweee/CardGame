from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from mr_lim_card_game.services.game_service import GameService
from mr_lim_card_game.dependencies import get_game_service
from mr_lim_card_game.utils.app_logger import Logger

logger = Logger.get_logger("mr_lim_card_game")
router = APIRouter()


@router.websocket("/ws/{session_id}/{player_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    session_id: str,
    player_id: str,
    token: str = None,
    game_service: GameService = Depends(get_game_service),
):
    # TODO: Add Authentication to WS
    if token != "expected_token":  # Replace with your token validation logic
        logger.warning(
            f"[session_id={session_id}, player_id={player_id}] \
                WebSocket connection rejected: Invalid token"
        )
        await websocket.close(code=1008)  # Close with policy violation code
        return

    logger.info(
        f"[session_id={session_id}, player_id={player_id}] WebSocket connection established"
    )
    await game_service.connect(websocket, session_id, player_id)
    try:
        while True:
            data = await websocket.receive_text()
            logger.info(
                f"[session_id={session_id}, player_id={player_id}] Received message: '{data}'"
            )
            await game_service.broadcast(session_id, data)
    except WebSocketDisconnect:
        logger.info(f"[session_id={session_id}, player_id={player_id}] WebSocket disconnected")
        await game_service.disconnect(websocket, session_id, player_id)
