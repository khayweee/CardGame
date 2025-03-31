from typing import Dict
from fastapi import WebSocket
import asyncio


class ConnectionManager:
    """
    Temporary in-memory connection manager to simulate Redis behavior.
    """

    def __init__(self):
        # session_id -> {player_id -> WebSocket}
        self.connections: Dict[str, Dict[str, WebSocket]] = {}
        self.lock = asyncio.Lock()

    async def add_connection(self, session_id: str, player_id: str, websocket: WebSocket):
        """
        Add a WebSocket connection for a player in a session.
        """
        async with self.lock:
            if session_id not in self.connections:
                self.connections[session_id] = {}
            self.connections[session_id][player_id] = websocket

    async def remove_connection(self, session_id: str, player_id: str):
        """
        Remove a WebSocket connection for a player in a session.
        """
        async with self.lock:
            if session_id in self.connections and player_id in self.connections[session_id]:
                del self.connections[session_id][player_id]
            if session_id in self.connections and not self.connections[session_id]:
                del self.connections[session_id]

    async def get_connections(self, session_id: str) -> Dict[str, WebSocket]:
        """
        Get all WebSocket connections for a session.
        """
        async with self.lock:
            return self.connections.get(session_id, {})

    async def broadcast(self, session_id: str, message: str):
        """
        Broadcast a message to all WebSocket connections in a session.
        """
        async with self.lock:
            if session_id in self.connections:
                for websocket in self.connections[session_id].values():
                    await websocket.send_text(message)


# import aioredis
# from fastapi import WebSocket


# class ConnectionManager:
#     """
#     Redis-based connection manager for WebSocket connections.
#     """

#     def __init__(self, redis_url: str = "redis://localhost"):
#         self.redis = aioredis.from_url(redis_url)  # Connect to Redis

#     async def add_connection(self, session_id: str, player_id: str, websocket: WebSocket):
#         """
#         Add a WebSocket connection for a player in a session.
#         """
#         await websocket.accept()
#         # Store connection metadata in Redis
#         await self.redis.hset(f"session:{session_id}", player_id, "connected")

#     async def remove_connection(self, session_id: str, player_id: str):
#         """
#         Remove a WebSocket connection for a player in a session.
#         """
#         # Remove connection metadata from Redis
#         await self.redis.hdel(f"session:{session_id}", player_id)

#     async def get_connections(self, session_id: str):
#         """
#         Get all WebSocket connections for a session.
#         """
#         # Retrieve all players in the session from Redis
#         return await self.redis.hgetall(f"session:{session_id}")

#     async def broadcast(self, session_id: str, message: str):
#         """
#         Broadcast a message to all WebSocket connections in a session.
#         """
#         # Publish the message to the session's channel
#         await self.redis.publish(f"session:{session_id}:channel", message)
