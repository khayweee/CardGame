from fastapi import FastAPI
from .api.v1 import websocket_routes

app = FastAPI()

app.include_router(websocket_routes.router)
