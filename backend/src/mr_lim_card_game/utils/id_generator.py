import uuid


def generate_session_id() -> str:
    """
    Generate a unique session ID for the game.
    The session ID is a 6-character string made up of uppercase letters and digits.
    """
    return str(uuid.uuid4()).split("-")[0].upper()[1:-1]
