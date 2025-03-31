from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from mr_lim_card_game.services.game_service import GameService
from mr_lim_card_game.dependencies import get_game_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


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
            f"WebSocket connection rejected: Invalid token for \
            session_id={session_id}, player_id={player_id}"
        )
        await websocket.close(code=1008)  # Close with policy violation code
        return

    logger.info(
        f"WebSocket connection established: session_id={session_id}, player_id={player_id}"
    )
    await game_service.connect(websocket, session_id, player_id)
    try:
        while True:
            data = await websocket.receive_text()
            logger.info(
                f"Received message: {data} from player_id={player_id} in session_id={session_id}"
            )
            await game_service.broadcast(session_id, data)
    except WebSocketDisconnect:
        logger.info(f"WebSocket disconnected: session_id={session_id}, player_id={player_id}")
        await game_service.disconnect(websocket, session_id, player_id)
