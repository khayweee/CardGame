from fastapi.testclient import TestClient
from mr_lim_card_game.main import app

client = TestClient(app)


def test_create_game():
    """
    Test the `/game/create-session` endpoint.
    Ensures that a session is created successfully and a session ID is returned.
    """
    response = client.post(app.url_path_for("create_game"))
    assert response.status_code == 200
    data = response.json()
    assert "session_id" in data
    assert data["session_id"] is not None


def test_add_player():
    """
    Test the `/game/add-player/{session_id}` endpoint.
    Ensures that a player is added to a session successfully.
    """
    # Create a session first
    response = client.post(app.url_path_for("create_game"))
    session_id = response.json()["session_id"]

    # Add a player to the session
    response = client.post(
        app.url_path_for("add_player"), json={"session_id": session_id, "name": "Player1"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "player" in data
    assert data["player"]["name"] == "Player1"


def test_get_session_info():
    """
    Test the `/game/get-info/{session_id}` endpoint.
    Ensures that session information is retrieved successfully.
    """
    # Create a session first
    response = client.post(app.url_path_for("create_game"))
    session_id = response.json()["session_id"]

    # Get session info
    response = client.get(f"/game/get-info/{session_id}")
    assert response.status_code == 200
    data = response.json()
    assert "session_info" in data
    assert data["session_info"]["session_id"] == session_id


def test_list_sessions():
    """
    Test the `/game/list-sessions` endpoint.
    Ensures that all active sessions are listed successfully.
    """
    # Create two sessions
    client.post(app.url_path_for("create_game"))
    client.post(app.url_path_for("create_game"))

    # List sessions
    response = client.get("/game/list-sessions")
    assert response.status_code == 200
    data = response.json()
    assert "sessions" in data
    assert len(data["sessions"]) >= 2


def test_remove_session():
    """
    Test the `/game/delete-session/{session_id}` endpoint.
    Ensures that a session is removed successfully.
    """
    # Create a session first
    response = client.post(app.url_path_for("create_game"))
    session_id = response.json()["session_id"]

    # Remove the session
    response = client.delete(f"/game/delete-session/{session_id}")
    assert response.status_code == 200

    # Verify the session is removed
    response = client.get(f"/game/get-info/{session_id}")
    assert response.status_code == 404
