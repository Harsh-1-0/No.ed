from fastapi import FastAPI
from agent.agent import create_roadmap  # Assuming this is the correct import
from tools.recommend import get_recommended_roles

from tools.github import main as get_github_data_api
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GOOGLE_GEN_AI")

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Welcome to the Roadmap Generator!"}

@app.post("/roadmap")
async def generate_roadmap(resume: str, role: str):
    roadmap = await create_roadmap(resume,role)  # Await the async function here
    return roadmap

@app.post("/recommend_roles")
async def generate_roles(tags: list):
    roles = get_recommended_roles(GEMINI_API_KEY,tags)
    return roles

@app.post("/github")
async def get_github_data(username:str):
    data = get_github_data_api(username)
    return data

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
