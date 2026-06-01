from flask import Flask, request, jsonify
from flask_cors import CORS
from db import obtener_carta, inicializar_db
from Rag import inicializar_rag, responder_pregunta

app = Flask(__name__)
CORS(app)

# Inicializa la base de datos al arrancar
inicializar_db()

@app.route('/')
def get_data():
    carta = obtener_carta()
    return jsonify(carta)

# Inicializa el RAG leyendo la DB
inicializar_rag()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    pregunta = data.get("mensaje")
    resultado = responder_pregunta(pregunta)
    return jsonify(resultado)

@app.route("/reload", methods=["POST"])
def reload():
    inicializar_rag()
    return jsonify({"status": "Vectorstore recargado desde DB"})

if __name__ == "__main__":
    app.run(debug=True)
