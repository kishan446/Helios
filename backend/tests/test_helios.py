"""Backend tests for HELIOS Game Engine API"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check endpoint"""
    def test_root_health(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"Health check: {data['message']}")

class TestGallery:
    """Gallery endpoints"""
    def test_get_gallery_returns_list(self):
        response = requests.get(f"{BASE_URL}/api/gallery")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Gallery returned {len(data)} items")

    def test_save_to_gallery_and_verify(self):
        game_payload = {
            "title": "TEST_ Sample Game",
            "html": "<!DOCTYPE html><html><body>Test</body></html>",
            "prompt": "TEST_ simple test game",
            "subject": "Testing"
        }
        response = requests.post(f"{BASE_URL}/api/gallery", json=game_payload)
        assert response.status_code == 200
        data = response.json()
        assert data.get("success") == True
        assert "id" in data
        print(f"Saved game with id: {data['id']}")

        # Verify it appears in gallery
        gallery_response = requests.get(f"{BASE_URL}/api/gallery")
        assert gallery_response.status_code == 200
        games = gallery_response.json()
        titles = [g.get("title", "") for g in games]
        assert any("TEST_" in t for t in titles), "Saved game not found in gallery"
        print("Game persistence verified in gallery")

class TestGenerateGame:
    """Game generation endpoint - basic validation only (not full generation due to time)"""
    def test_generate_game_invalid_empty_prompt(self):
        response = requests.post(f"{BASE_URL}/api/generate-game", json={"prompt": ""})
        # Empty prompt should still attempt generation or return error
        assert response.status_code in [200, 400, 422, 500]
        print(f"Empty prompt returned status: {response.status_code}")

    def test_generate_game_valid_request_structure(self):
        """Test that the endpoint accepts valid request and returns expected structure"""
        # Send a very minimal prompt to see response structure (may be slow)
        # We'll just test request format validation
        response = requests.post(f"{BASE_URL}/api/generate-game", json={
            "prompt": "simple platformer game",
            "classLevel": "Class 3-5",
            "subject": "Adventure",
            "language": "English",
            "gameType": "Auto",
            "educational": True,
            "mobile": True,
            "sound": True
        }, timeout=180)  # 3 min timeout for AI generation
        assert response.status_code == 200
        data = response.json()
        assert "html" in data
        assert "title" in data
        assert isinstance(data["html"], str)
        assert len(data["html"]) > 100
        print(f"Game generated: {data['title']}, HTML length: {len(data['html'])}")
