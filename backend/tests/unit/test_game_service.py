from src.mr_lim_card_game.services.game_service import GameService


def test_create_session():
    service = GameService()

    session_id = service.create_session()

    assert session_id is not None
    assert service.sessions.get_session(session_id) is not None


def test_add_player():
    service = GameService()
    session_id = service.create_session()

    player = service.add_player(session_id, "Player1")

    session = service.sessions.get_session(session_id)
    assert len(session.players) == 1
    assert session.players[0].id == player.id
    assert session.players[0].name == "Player1"


def test_update_game_state():
    service = GameService()
    session_id = service.create_session()

    service.update_game_state(session_id, "key", "value")

    session = service.sessions.get_session(session_id)
    assert session.state["key"] == "value"
