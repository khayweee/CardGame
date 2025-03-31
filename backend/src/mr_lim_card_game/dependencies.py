from mr_lim_card_game.services.game_service import GameService

# Create a singleton instance of GameService
game_service = GameService()


def get_game_service() -> GameService:
    """Dependency to provide the GameService instance"""
    return game_service
