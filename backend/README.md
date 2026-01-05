# Backend - FastAPI

FastAPI backend with SQLite database for comments.

## Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Load initial data (if needed):**
   ```bash
   python load_comments.py
   ```

3. **Run the server:**
   ```bash
   uvicorn api:app --reload
   ```

   Or using Python directly:
   ```bash
   python -m uvicorn api:app --reload
   ```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive API docs**: http://localhost:8000/docs
- **Alternative docs**: http://localhost:8000/redoc

## API Endpoints

- `GET /comments` - Get all comments
- `POST /comments` - Create a new comment
- `DELETE /comments/{comment_id}` - Delete a comment
- `PUT /comments/{comment_id}` - Update a comment

## Development

The `--reload` flag enables auto-reload on code changes.

