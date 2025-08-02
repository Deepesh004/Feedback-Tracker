from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
from dotenv import load_dotenv
from models import feedback_list  # this should be a simple list of feedback

# Load environment variables
load_dotenv()

# Initialize OpenAI client with API key from .env
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Create FastAPI app instance
app = FastAPI()

# Enable CORS so frontend can communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust if your frontend is hosted elsewhere
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class Feedback(BaseModel):
    message: str

class Question(BaseModel):
    question: str

# Routes
@app.get("/")
def read_root():
    return {"status": "Backend is running"}

@app.get("/feedback")
def get_feedback():
    return feedback_list

@app.post("/feedback")
def add_feedback(feedback: Feedback):
    feedback_list.append({"message": feedback.message})
    return {"status": "Feedback added"}

@app.post("/ask")
def ask_ai(q: Question):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": q.question}],
            temperature=0.7,
            max_tokens=100
        )
        return {"answer": response.choices[0].message.content.strip()}
    except Exception as e:
        return {"error": str(e)}
