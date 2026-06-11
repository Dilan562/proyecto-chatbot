from flask import Flask, request, jsonify, session
from flask_cors import CORS
from db import obtener_carta, inicializar_db, insertar_plato, actualizar_plato, eliminar_plato
from Rag import inicializar_rag, responder_pregunta
from db_usuarios import (
    inicializar_usuarios,
    obtener_usuarios,
    insertar_usuario,
    actualizar_usuario,
    eliminar_usuario
)
import os
from flask import send_from_directory
import sqlite3

app = Flask(__name__)
app.secret_key = "clave-secreta"
CORS(app)

UPLOAD_FOLDER = os.path.join("static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # 👈 crea la carpeta si no existe

def validar_usuario(email, password):
    conn = sqlite3.connect("db_usuarios.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre_usuario, role FROM usuarios WHERE email=? AND contraseña=?", (email, password))
    user = cursor.fetchone()
    conn.close()
    return user

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = validar_usuario(email, password)
    if user:
        session["user_id"] = user[0]
        session["role"] = user[2]
        return jsonify({"message": "Login exitoso", "role": user[2]})
    return jsonify({"error": "Credenciales inválidas"}), 401

@app.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada"})



@app.route("/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

# Inicializa las bases de datos
inicializar_db()
inicializar_usuarios()
inicializar_rag()

@app.route("/menu", methods=["GET", "POST"])
def menu():
    if request.method == "GET":
        carta = obtener_carta()
        return jsonify(carta)

    elif request.method == "POST":
        data = request.get_json()
        insertar_plato(
            data["nombre_plato"],
            data.get("descripcion"),
            data["precio"],
            data.get("imagen"),
            data.get("categoria")
        )
        return jsonify({"message": "Plato agregado"}), 201


import os
from flask import send_from_directory

UPLOAD_FOLDER = os.path.join("static", "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/menu/<int:id>", methods=["GET", "PUT", "DELETE"])
def menu_item(id):
    if request.method == "GET":
        carta = obtener_carta()
        plato = next((p for p in carta if p["id"] == id), None)
        if plato:
            return jsonify(plato)
        return jsonify({"error": "Plato no encontrado"}), 404

    elif request.method == "PUT":
        nombre_plato = request.form.get("nombre_plato")
        descripcion = request.form.get("descripcion")
        precio = request.form.get("precio")
        categoria = request.form.get("categoria")
        imagen_file = request.files.get("imagen")

        if imagen_file:
            filepath = os.path.join(UPLOAD_FOLDER, imagen_file.filename)
            imagen_file.save(filepath)
            imagen = f"uploads/{imagen_file.filename}"  # 👈 ruta relativa para servir
        else:
            imagen = request.form.get("imagen")

        actualizar_plato(
            id,
            nombre=nombre_plato,
            descripcion=descripcion,
            precio=precio,
            imagen=imagen,
            categoria=categoria
        )
        return jsonify({"message": "Plato actualizado"})

    elif request.method == "DELETE":
        eliminar_plato(id)
        return jsonify({"message": "Plato eliminado"})

# --- USUARIOS ---
@app.route("/admin", methods=["GET", "POST"])
def admin():
    if request.method == "GET":
        usuarios = obtener_usuarios()
        return jsonify(usuarios)
    elif request.method == "POST":
        data = request.get_json()
        insertar_usuario(
            data["nombre_usuario"],
            data["email"],
            data["contraseña"],
            data["role"]
        )
        return jsonify({"message": "Usuario creado"}), 201

@app.route("/admin/<int:id>", methods=["GET", "PUT", "DELETE"])
def admin_user(id):
    if request.method == "GET":
        usuarios = obtener_usuarios()
        usuario = next((u for u in usuarios if u["id"] == id), None)
        if usuario:
            return jsonify(usuario)
        return jsonify({"error": "Usuario no encontrado"}), 404

    elif request.method == "PUT":
        data = request.get_json()
        actualizar_usuario(
            id,
            nombre_usuario=data.get("name"),
            email=data.get("email"),
            contraseña=data.get("contraseña"),
            role=data.get("role")
        )
        return jsonify({"message": "Usuario actualizado"})

    elif request.method == "DELETE":
        eliminar_usuario(id)
        return jsonify({"message": "Usuario eliminado"})





# --- CHAT RAG ---
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