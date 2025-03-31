import pytest
from mr_lim_card_game.services.game_service import SessionManager
from mr_lim_card_game.models.game import GameState
from mr_lim_card_game.utils.id_generator import generate_session_id


@pytest.mark.asyncio
async def test_add_and_get_session():
    session_id = generate_session_id()
    session_manager = SessionManager()
    game_state = GameState(session_id=session_id, players=[], state={})

    await session_manager.add_session(session_id, game_state)
    retrieved_session = await session_manager.get_session(session_id)

    assert retrieved_session == game_state


@pytest.mark.asyncio
async def test_remove_session():
    session_id = generate_session_id()
    session_manager = SessionManager()
    game_state = GameState(session_id=session_id, players=[], state={})

    await session_manager.add_session(session_id, game_state)
    await session_manager.remove_session(session_id)
    retrieved_session = await session_manager.get_session(session_id)

    assert retrieved_session is None


@pytest.mark.asyncio
async def test_list_sessions():
    session_manager = SessionManager()
    session_id_1 = generate_session_id()
    session_id_2 = generate_session_id()
    game_state_1 = GameState(session_id=session_id_1, players=[], state={})
    game_state_2 = GameState(session_id=session_id_2, players=[], state={})

    await session_manager.add_session(session_id_1, game_state_1)
    await session_manager.add_session(session_id_2, game_state_2)
    sessions = await session_manager.list_sessions()

    assert len(sessions) == 2
    assert sessions[session_id_1] == game_state_1
    assert sessions[session_id_2] == game_state_2
