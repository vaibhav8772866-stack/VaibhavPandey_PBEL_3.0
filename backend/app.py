from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

from chatbot import get_response

app = Flask(__name__)
CORS(app)

# FAQ file path
FAQ_FILE = os.path.join(os.path.dirname(__file__), "faq.json")


# -------------------------
# Load FAQs
# -------------------------
def load_faqs():
    if not os.path.exists(FAQ_FILE):
        with open(FAQ_FILE, "w", encoding="utf-8") as file:
            json.dump({}, file)

    with open(FAQ_FILE, "r", encoding="utf-8") as file:
        return json.load(file)


# -------------------------
# Save FAQs
# -------------------------
def save_faqs(data):
    with open(FAQ_FILE, "w", encoding="utf-8") as file:
        json.dump(data, file, indent=4, ensure_ascii=False)


# -------------------------
# Home
# -------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "AI Student Support Chatbot API Running Successfully"
    })


# -------------------------
# Chat API
# -------------------------
@app.route("/chat", methods=["POST"])
def chat():

    data = request.get_json()

    if not data:
        return jsonify({"reply": "Invalid request."}), 400

    message = data.get("message", "")

    if message.strip() == "":
        return jsonify({"reply": "Please enter your question."})

    reply = get_response(message)

    return jsonify({"reply": reply})


# -------------------------
# Get All FAQs
# -------------------------
@app.route("/faqs", methods=["GET"])
def get_faqs():

    faqs = load_faqs()

    return jsonify(faqs)


# -------------------------
# Add FAQ
# -------------------------
@app.route("/faqs", methods=["POST"])
def add_faq():

    data = request.get_json()

    keyword = data.get("keyword", "").strip().lower()
    answer = data.get("answer", "").strip()

    if keyword == "" or answer == "":
        return jsonify({
            "message": "Keyword and Answer are required."
        }), 400

    faqs = load_faqs()

    faqs[keyword] = answer

    save_faqs(faqs)

    return jsonify({
        "message": "FAQ Added Successfully"
    })


# -------------------------
# Update FAQ
# -------------------------
@app.route("/faqs/<keyword>", methods=["PUT"])
def update_faq(keyword):

    data = request.get_json()

    answer = data.get("answer", "").strip()

    faqs = load_faqs()

    if keyword not in faqs:
        return jsonify({
            "message": "FAQ not found."
        }), 404

    faqs[keyword] = answer

    save_faqs(faqs)

    return jsonify({
        "message": "FAQ Updated Successfully"
    })


# -------------------------
# Delete FAQ
# -------------------------
@app.route("/faqs/<keyword>", methods=["DELETE"])
def delete_faq(keyword):

    faqs = load_faqs()

    if keyword not in faqs:
        return jsonify({
            "message": "FAQ not found."
        }), 404

    del faqs[keyword]

    save_faqs(faqs)

    return jsonify({
        "message": "FAQ Deleted Successfully"
    })


# -------------------------
# Run Server
# -------------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)