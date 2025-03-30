# Card Game

A simple multi-player card game

```bash
mr_lim_card_game/
├── backend/                     # Backend (FastAPI) code
│   ├── src/                     # Source code for the backend
│   │   ├── mr_lim_card_game/    # Main backend application package
│   │   │   ├── __init__.py
│   │   │   ├── api/             # API routes
│   │   │   │   ├── __init__.py
│   │   │   │   ├── v1/          # Versioned API routes
│   │   │   │       ├── __init__.py
│   │   │   │       ├── game.py  # Example API route for game logic
│   │   │   ├── core/            # Core application logic (e.g., settings, config)
│   │   │   │   ├── __init__.py
│   │   │   │   ├── config.py    # Configuration settings
│   │   │   ├── models/          # Database models or Pydantic schemas
│   │   │   │   ├── __init__.py
│   │   │   │   ├── game.py      # Example schema for game data
│   │   │   ├── services/        # Business logic and services
│   │   │   │   ├── __init__.py
│   │   │   │   ├── game_service.py
│   │   │   ├── main.py          # Entry point for FastAPI app
│   │   ├── tests/               # Backend tests
│   │       ├── __init__.py
│   │       ├── test_game.py     # Example test file
│   ├── pyproject.toml           # Poetry configuration for backend
│   ├── README.md                # Backend-specific README
├── frontend/                    # Frontend (Next.js) code
│   ├── public/                  # Static assets
│   ├── src/                     # Source code for the frontend
│   │   ├── components/          # React components
│   │   ├── pages/               # Next.js pages
│   │   ├── styles/              # CSS/SCSS files
│   │   ├── utils/               # Utility functions
│   ├── package.json             # Frontend dependencies
│   ├── next.config.js           # Next.js configuration
│   ├── README.md                # Frontend-specific README
├── .circleci/                   # CircleCI configuration
│   ├── config.yml               # CircleCI pipeline configuration
├── .gitignore                   # Git ignore file
├── README.md                    # Project-level README
```
