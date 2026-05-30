from flask import Flask
from flask_cors import CORS
from flask import Flask, request, jsonify
from Rag import inicializar_rag, responder_pregunta

app=Flask(__name__)
CORS(app)

@app.route('/')
def get_data():
    return {'carta': [ {
            "id": 1,
            "nombre_plato": "Pizza",
            "descripcion": "Pizza con queso",
            "precio": "20000",
            "imagen": "/pizza.png"
        },
        {
            "id": 2,
            "nombre_plato": "Hamburguesa",
            "descripcion": "Con doble carne",
            "precio": "18000",
            "imagen": "/burger.png"
        },
        {
            "id": 3,
            "nombre_plato": "Ensalada",
            "descripcion": "Ensalada con pollo",
            "precio": "15000",
            "imagen": "/ensalada.png"
        },
        {
            "id": 4,
            "nombre_plato": "Pasta",
            "descripcion": "Pasta con salsa de tomate",
            "precio": "17000",
            "imagen": "/pasta.png"
        }]}
    

# Al iniciar el servidor, refresca el PDF
inicializar_rag("example1.pdf")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    print("Datos recibidos en Flask:", data)  # <-- debug
    pregunta = data.get("mensaje")

    resultado = responder_pregunta(pregunta)
    print("Resultado generado:", resultado)  # <-- debug
    return jsonify(resultado)

@app.route("/reload", methods=["POST"])
def reload():
    data = request.get_json()
    nueva_ruta = data.get("ruta_pdf")
    inicializar_rag(nueva_ruta)
    return jsonify({"status": "Vectorstore recargado"})
    
if __name__ == "__main__":
    app.run(debug=True)