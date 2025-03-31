# Makefile to run common tasks for the project
BACKEND_DIR := backend
FRONTEND_DIR := frontend


test_backend:
	cd $(BACKEND_DIR) && poetry run pytest -v

lint_backend:
	cd $(BACKEND_DIR) && poetry run flake8 src tests

format_backend:
	cd $(BACKEND_DIR) && poetry run black src tests