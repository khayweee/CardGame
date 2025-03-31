# Makefile to run common tasks for the project
BACKEND_DIR := backend
FRONTEND_DIR := frontend


test_backend:
	cd $(BACKEND_DIR) && poetry run pytest -v --disable-warnings