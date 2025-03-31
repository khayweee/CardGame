# Use the official Python image as the base image
FROM python:3.13.2-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies required for Poetry and Python
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    ln -s /root/.local/bin/poetry /usr/local/bin/poetry

# Copy the application code
COPY src /app/src

# Copy only the Poetry files first to leverage Docker caching
COPY pyproject.toml poetry.lock* README.md /app/

# Install dependencies using Poetry
RUN poetry config virtualenvs.create false && \
    poetry install --without dev

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["poetry", "run", "uvicorn", "mr_lim_card_game.main:app", "--host", "0.0.0.0", "--port", "8000"]