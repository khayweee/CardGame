import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"  # HMAC-SHA256 algorithm


def generate_token(player_id: str, name: str) -> str:
    payload = {
        "player_id": player_id,
        "name": name,
        "exp": datetime.now() + timedelta(hours=1),  # Token expires in 1 hour
        "iat": datetime.now(),  # Issued at
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def validate_token(token: str, player_id: str) -> dict:
    """Validate if the token is valid and matches the player_id"""
    try:
        token_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if token_data["player_id"] != player_id:
            return None
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError:
        # Invalid token
        return None
