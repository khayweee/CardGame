import pytest
from mr_lim_card_game.services.game_service import GameService
from mr_lim_card_game.models.game import GameState, Player


@pytest.mark.asyncio
async def test_create_session():
    """
    Test the `create_session` method of the `GameService` class.

    This test performs the following checks:
    1. Ensures that a session ID is generated and is not `None`.
    2. Verifies that a session can be retrieved using the generated session ID.
    3. Confirms that the retrieved session is not `None`.
    4. Asserts that the retrieved session is an instance of the `GameState` class.
    """
    service = GameService()

    session_id = await service.create_session()

    # Ensure session ID is generated
    assert session_id is not None
    # Ensure session is created
    session = await service.sessions.get_session(session_id)
    # Ensure session is not None
    assert session is not None
    # Ensure session is of type GameState
    assert isinstance(session, GameState)


@pytest.mark.asyncio
async def test_add_player():
    """
    Test the `add_player` method of the `GameService` class.
    This test performs the following checks:
    1. Creates a new session.
    2. Adds a player to the session.
    3. Retrieves the session and checks if the player was added successfully.
    4. Asserts that the player ID and name match the expected values.
    5. Ensures that the session contains the correct number of players
    """
    service = GameService()
    session_id = await service.create_session()

    player = await service.add_player(session_id, "Player1")

    session = await service.sessions.get_session(session_id)

    # Ensure player is added
    assert len(session.players) == 1
    # Ensure player ID matches
    assert session.players[0].id == player.id
    # Ensures player name matches
    assert session.players[0].name == "Player1"


@pytest.mark.asyncio
async def test_update_game_state():
    """
    Test the `update_game_state` method of the `GameService` class.
    This test performs the following checks:
    1. Creates a new session.
    2. Updates the game state with a key-value pair.
    3. Retrieves the session and checks if the game state was updated successfully.
    4. Asserts that the updated game state contains the correct key-value pair.
    """
    service = GameService()
    session_id = await service.create_session()

    await service.update_game_state(session_id, "key", "value")

    session = await service.sessions.get_session(session_id)

    # Ensure game state update is recorded
    assert session.state["key"] == "value"


@pytest.mark.asyncio
async def test_get_session_info():
    """ 
    Test the `get_session_info` method of the `GameService` class.

    This test performs the following checks:
    1. Creates a new session.
    2. Retrieves the session information using the session ID.
    3. Asserts that the session information is not `None`.
    4. Ensures that the session ID in the retrieved information matches the original session ID.
    """
    service = GameService()
    session_id = await service.create_session()

    session_info = await service.get_session_info(session_id)

    # Ensure session info is not None
    assert session_info is not None
    # Ensure session ID matches the created session ID
    assert session_info.session_id == session_id


@pytest.mark.asyncio
async def test_list_sessions():
    service = GameService()
    session_id_1 = await service.create_session()
    session_id_2 = await service.create_session()

    sessions = await service.list_sessions()

    assert len(sessions) == 2
    assert session_id_1 in sessions
    assert session_id_2 in sessions


@pytest.mark.asyncio
async def test_remove_session():
    service = GameService()
    session_id = await service.create_session()

    await service.remove_session(session_id)
    session = await service.sessions.get_session(session_id)

    assert session is None
