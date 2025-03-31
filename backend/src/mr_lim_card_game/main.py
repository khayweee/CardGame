from fastapi import FastAPI, Depends
from mr_lim_card_game.api.v1 import websocket_route, game_route
from mr_lim_card_game.dependencies import get_game_service

# Initialize the FastAPI app
app = FastAPI(
    title="Mr Lim Card Game API",
    description="API for Mr Lim Card Game",
    version="0.1.0",
)

# Include routers and ensure they use the singleton GameService instance
app.include_router(websocket_route.router, dependencies=[
                   Depends(get_game_service)])
app.include_router(
    game_route.router, prefix="/game", tags=["game"], dependencies=[Depends(get_game_service)]
)
