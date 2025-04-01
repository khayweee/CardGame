import jwt
from datetime import datetime, timedelta

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"  # HMAC-SHA256 algorithm


def generate_token(player_id: str, name: str) -> str:
    payload = {
        "player_id": player_id,
        "name": name,
        "exp": datetime.utcnow() + timedelta(hours=1),  # Token expires in 1 hour
        "iat": datetime.utcnow(),  # Issued at
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def validate_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.ExpiredSignatureError:
        # Token has expired
        return None
    except jwt.InvalidTokenError:
        # Invalid token
        return None
