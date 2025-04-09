# Makefile to run common tasks for the project
BACKEND_DIR := backend
FRONTEND_DIR := frontend


test_backend:
	cd $(BACKEND_DIR) && poetry run pytest -v

lint_backend:
	cd $(BACKEND_DIR) && poetry run flake8 src tests

format_backend:
	cd $(BACKEND_DIR) && poetry run black src tests

pre_commit_run_backend:
	cd $(BACKEND_DIR) && poetry run pre-commit run --all-files

# Devops
build_development:
	docker-compose -f docker-compose.dev.yml build

start_development:
	docker-compose -f docker-compose.dev.yml up


circleci_local:
	if ! command -v circleci &> /dev/null; then \
		echo "circleci CLI not found, please install circleci cli first"; \
	fi
	circleci local execute test-python
