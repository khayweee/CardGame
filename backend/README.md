# Backend

This is the source code for the backend

## Folder Breakdown

| Folder      | Role                                                          |
| ----------- | ------------------------------------------------------------- |
| `api/`      | Defines HTTP endpoints and request/response logic.            |
| `core/`     | Contains foundational logic like configuration and utilities. |
| `models/`   | Defines data structures for validation and serialization.     |
| `services/` | Implements business logic and interacts with data storage.    |
| `main.py`   | Entry point for the FastAPI application, initializes the app. |

### 1. API Routes

This folder contains the FastAPI route definitions. It organizes the endpoints that the backend exposes to the frontend or other clients. The routes are typically grouped by functionality and versioned for maintainability.

### 2. Core Application Logic

This folder contains the foundational logic for the application, such as configuration settings, constants, and utilities that are used throughout the backend.

- Purpose: Centralizes configuration settings (e.g., environment variables, database URLs) to make the app easier to configure and maintain.
- Example: The settings object can be imported anywhere in the app to access configuration values.

### 3. Data Models

This folder contains the Pydantic models (for request/response validation) and database models (if using an ORM like SQLAlchemy). These models define the structure of the data used in the application.

### 4. Services: Business Logic

This folder contains the core business logic of the application. Services are responsible for implementing the actual functionality, such as interacting with the database, performing calculations, or managing game state.

- Purpose: Encapsulates the business logic, making it reusable and testable.
- Example: The create_game function adds a new game to an in-memory database, while get_game retrieves a game by its ID.
