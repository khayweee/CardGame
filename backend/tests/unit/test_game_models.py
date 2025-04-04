from src.mr_lim_card_game.models.game import GameState, Player
from datetime import datetime
from src.mr_lim_card_game.utils.id_generator import generate_session_id


def test_player_model():
    player = Player(id="1", name="Player1", date_joined=datetime(2023, 1, 1))

    assert player.id == "1"
    assert player.name == "Player1"
    assert player.date_joined == datetime(2023, 1, 1)


def test_game_state_model():
    player = Player(id="1", name="Player1", date_joined=datetime(2023, 1, 1))
    session_id = generate_session_id()
    game_state = GameState(
        session_id=session_id,
        players=[player],
        state={"key": "value"},
        date_created=datetime(2023, 1, 1),
    )

    assert game_state.session_id == session_id
    assert len(game_state.players) == 1
    assert game_state.players[0].id == "1"
    assert game_state.state["key"] == "value"
    assert game_state.date_created == datetime(2023, 1, 1)
