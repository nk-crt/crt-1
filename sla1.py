"""i want to build a simle pdf upload system,and after summary should be given as output, kepp simple 
 ,this time im going to create dashbord ,but learn and do"""

from fastapi import FastAPI,UploadFile,File
from pypdf import PdfReader
from groq import Groq
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

load_dotenv()
app = FastAPI()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def ask_ai(query):
    
    response=client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role":"system",
                "content":"summarize the content and give me in bullet points,summarize in four points    "
            },
            {
                "role":"user",
                "content":query
            }
        ]
    )
    return response.choices[0].message.content






@app.post("/upload")
async def container(file:UploadFile=File(...)):
    pdf_bytes= await file.read()
    with open("temp_pdf","wb") as f:
        f.write(pdf_bytes)
    reader =PdfReader("temp_pdf")
    text=""
    for page in reader.pages:
        text+=page.extract_text() or ""
        
    summary= ask_ai(text)
   
    return {
        "summary":summary
    }
        













