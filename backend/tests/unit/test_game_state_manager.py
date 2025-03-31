from uuid import uuid4
from src.mr_lim_card_game.models.game import GameState, Player
from src.mr_lim_card_game.services.game_state_manager import GameStateManager
from src.mr_lim_card_game.utils.id_generator import generate_session_id


def test_add_player():
    session_id = generate_session_id()
    game_state = GameState(session_id=session_id, players=[], state={})
    manager = GameStateManager(game_state)
    player = Player(id=str(uuid4()), name="Player1")

    manager.add_player(player)

    assert len(game_state.players) == 1
    assert game_state.players[0].id == player.id


def test_remove_player():
    session_id = generate_session_id()
    player1 = Player(id="1", name="Player1")
    player2 = Player(id="2", name="Player2")
    game_state = GameState(session_id=session_id, players=[player1, player2], state={})
    manager = GameStateManager(game_state)

    manager.remove_player("1")

    assert len(game_state.players) == 1
    assert game_state.players[0].id == "2"


def test_update_state():
    session_id = generate_session_id()
    game_state = GameState(session_id=session_id, players=[], state={})
    manager = GameStateManager(game_state)

    manager.update_state("key", "value")

    assert game_state.state["key"] == "value"


def test_get_player():
    session_id = generate_session_id()
    player = Player(id="1", name="Player1")
    game_state = GameState(session_id=session_id, players=[player], state={})
    manager = GameStateManager(game_state)

    retrieved_player = manager.get_player("1")

    assert retrieved_player is not None
    assert retrieved_player.id == "1"
