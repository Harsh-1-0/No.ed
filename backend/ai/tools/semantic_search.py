import os
import pymongo
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv
import torch

load_dotenv()
mongodb_uri = os.getenv("MONGODB_URI")

client = pymongo.MongoClient(mongodb_uri)
db = client["job_db"]
collection = db["job_roles"]

device = "cuda" if torch.cuda.is_available() else "cpu"
model = SentenceTransformer("paraphrase-MiniLM-L6-v2", device=device)

def semantic_search(query_text, top_k=3):
    query_embedding = model.encode(query_text).tolist()

    search_query = {
        "$vectorSearch": {
            "index": "vector_index",  
            "path": "description_embedding",
            "queryVector": query_embedding,
            "numCandidates": 100,
            "limit": top_k,
            "similarity": "cosine"
        }
    }

    results = collection.aggregate([search_query])

    for result in results:
        print(f"Job Title: {result['job_title']}")
        print(f"Skills: {', '.join(result['skills'])}")
        print(f"Technologies: {', '.join(result['technologies'])}")
        print(f"Description: {result['description']}\n")

query = input("Enter a job role or skill: ")
semantic_search(query)
