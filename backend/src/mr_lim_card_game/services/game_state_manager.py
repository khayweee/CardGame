"""
Controller for GameState
- SessionManager: Manages active game sessions
- GameService: Handles game logic and player management
- GameStateManager: Manages the game state and player interactions
"""

from mr_lim_card_game.models.game import GameState, Player
from typing import Optional


class GameStateManager:
    """Handles operations on the GameState"""

    def __init__(self, game_state: GameState):
        """Initialize with a GameState instance"""
        self.game_state = game_state

    def add_player(self, player: Player):
        """Add a player to the game"""
        self.game_state.players.append(player)

    def remove_player(self, player_id: str):
        """Remove a player from the game by ID"""
        self.game_state.players = [
            player for player in self.game_state.players if player.id != player_id
        ]

    def update_state(self, key: str, value):
        """Update the game state dictionary"""
        self.game_state.state[key] = value

    def get_player(self, player_id: str) -> Optional[Player]:
        """Retrieve a player by ID"""
        return next(
            (player for player in self.game_state.players if player.id == player_id),
            None,
        )
