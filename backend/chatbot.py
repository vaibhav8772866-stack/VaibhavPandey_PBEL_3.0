import json
import os
from difflib import get_close_matches
from groq import Groq
from config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)

faq_file = os.path.join(os.path.dirname(__file__), "faq.json")


def load_faq():
    with open(faq_file, "r", encoding="utf-8") as file:
        return json.load(file)


def get_response(message):
    faq_data = load_faq()   # 🔥 Har request par latest faq.json load hoga

    user_message = message.strip()
    lower_message = user_message.lower()

    greetings = ["hi", "hello", "hey", "good morning", "good evening"]

    if any(greet in lower_message for greet in greetings):
        return (
            "👋 Hello! Welcome to AI Student Support Services.\n\n"
            "Ask me about Admission, Hostel, Fees, Library, Exams, Scholarship, Placement and more."
        )

    if "thank" in lower_message:
        return "😊 You're welcome!"

    if "bye" in lower_message:
        return "👋 Goodbye!"

    # FAQ Match
    for keyword, answer in faq_data.items():
        if keyword.lower() in lower_message:
            return answer

    # Similar FAQ Match
    words = lower_message.split()

    for word in words:
        match = get_close_matches(word, faq_data.keys(), n=1, cutoff=0.7)
        if match:
            return faq_data[match[0]]

    # AI Fallback
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI Student Support Assistant. Answer politely in simple English."
                },
                {
                    "role": "user",
                    "content": user_message
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"Groq Error: {e}"