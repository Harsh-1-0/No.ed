import json
import pymongo
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

load_dotenv()
mongodb_uri = os.getenv("MONGODB_URI")

client = pymongo.MongoClient(mongodb_uri)
db = client["job_db"]  
collection = db["job_roles"]  

model = SentenceTransformer("all-MiniLM-L6-v2")

with open("data/job_roles.json", "r", encoding="utf-8") as file:
    job_data = json.load(file)

for job in job_data:
    job["description_embedding"] = model.encode(job["description"]).tolist()

collection.insert_many(job_data)

print("Data uploaded successfully!")
