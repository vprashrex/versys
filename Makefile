
start-server:
	uvicorn backend.app:app --reload

install-modules:
	pip install -r ./backend/requirements.txt