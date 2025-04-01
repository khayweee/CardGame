from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Query
from mr_lim_card_game.services.game_service import GameService
from mr_lim_card_game.dependencies import get_game_service
from mr_lim_card_game.utils.token_utils import validate_token
from mr_lim_card_game.utils.app_logger import Logger

logger = Logger.get_logger("mr_lim_card_game")
router = APIRouter()


@router.websocket("/ws/{session_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    session_id: str,
    token: str = Query(...),
    game_service: GameService = Depends(get_game_service),
):
    # Validate JWT token
    player_data = validate_token(token)
    if not player_data:
        logger.warning("Invalid or expired token")
        await websocket.close(code=1008)  # Policy violation
        return

    player_id = player_data["player_id"]
    name = player_data["name"]

    logger.info(f"WebSocket connection established for player: {name} (ID: {player_id})")
    await game_service.connect(websocket, session_id, player_id)

    try:
        while True:
            data = await websocket.receive_text()
            logger.info(f"Received message from {name} (ID: {player_id}): {data}")
            await game_service.broadcast(session_id, data)
    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected for player: {name} (ID: {player_id})")
        await game_service.disconnect(websocket, session_id, player_id)
