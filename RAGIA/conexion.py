from flask import Flask
from Rag import iniciar_chat

app=Flask(__name__)

@app.route('/')
def home():
    iniciar_chat("example1.pdf")

if __name__ == "__main__":
    app.run(debug=True)