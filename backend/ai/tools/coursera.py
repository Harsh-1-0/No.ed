import base64
import os
import requests
from dotenv import load_dotenv
from smolagents import tool

load_dotenv()

CLIENT_ID = os.getenv("CLIENT_ID")
CLIENT_SECRET = os.getenv("CLIENT_SECRET")

TOKEN_URL = "https://api.coursera.com/oauth2/client_credentials/token"

@tool
def get_coursera_token() -> str:
    """Fetches an OAuth2 access token for Coursera API.

    Returns:
        A valid access token if successful, otherwise an error message.
    """
    credentials = f"{CLIENT_ID}:{CLIENT_SECRET}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    
    headers = {
        "Authorization": f"Basic {encoded_credentials}",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    response = requests.post(TOKEN_URL, headers=headers, data={"grant_type": "client_credentials"})
    
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        return f"Error: Failed to obtain token. Status Code: {response.status_code}"

@tool
def search_courses(keywords: list, token: str) -> dict:
    """Searches for Coursera courses based on given keywords.

    Args:
        keywords: A list of up to 5 keywords.
        token: OAuth2 access token.

    Returns:
        A dictionary mapping each keyword to a list of courses or an error message.
    """
    results = {}
    headers = {"Authorization": f"Bearer {token}"}
    
    for keyword in keywords[:5]:  # Ensure max 5 keywords
        url = f"https://api.coursera.org/api/courses.v1?q=search&query={keyword}"
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            courses = response.json().get("elements", [])[:2]  # Limit to 2 results per keyword
            results[keyword] = [{"id": course["id"], "name": course["name"]} for course in courses]
        else:
            results[keyword] = {"error": f"Failed to fetch courses. Status Code: {response.status_code}"}
    
    return results
