import sqlite3

DB_NAME = "db_usuarios.db"

def inicializar_usuarios():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Crear tabla si no existe
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_usuario TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        contraseña TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin','usuario'))
    )
    """)

    # Verificar si ya hay datos
    cursor.execute("SELECT COUNT(*) FROM usuarios")
    count = cursor.fetchone()[0]

    if count == 0:  # Solo insertar si está vacía
        usuarios = [
            ("Admin", "Admin@example.com", "admin", "admin"),
            ("María García", "maria.garcia@example.com", "contraseña2", "usuario"),
            ("Carlos López", "carlos.lopez@example.com", "contraseña3", "usuario"),
            ("Ana Martínez", "ana.martinez@example.com", "contraseña4", "usuario"),
        ]
        cursor.executemany(
            "INSERT INTO usuarios (nombre_usuario, email, contraseña, role) VALUES (?, ?, ?, ?)",
            usuarios
        )
        conn.commit()

    conn.close()
    print("Base de datos inicializada con usuarios de ejemplo.")

def obtener_usuarios():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre_usuario, email, contraseña, role FROM usuarios")
    rows = cursor.fetchall()
    conn.close()

    usuarios = []
    for row in rows:
        usuarios.append({
            "id": row[0],
            "nombre_usuario": row[1],
            "email": row[2],
            "contraseña": row[3],
            "role": row[4]
        })
    return usuarios



def insertar_usuario(nombre_usuario, email, contraseña, role):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO usuarios (nombre_usuario, email, contraseña, role) VALUES (?, ?, ?, ?)",
        (nombre_usuario, email, contraseña, role)
    )
    conn.commit()
    conn.close()


def actualizar_usuario(id_usuario, nombre_usuario=None, email=None, contraseña=None, role=None):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    campos = []
    valores = []
    if nombre_usuario:
        campos.append("nombre_usuario=?")
        valores.append(nombre_usuario)
    if email:
        campos.append("email=?")
        valores.append(email)
    if contraseña:
        campos.append("contraseña=?")
        valores.append(contraseña)
    if role:
        campos.append("role=?")
        valores.append(role)
    valores.append(id_usuario)
    sql = f"UPDATE usuarios SET {', '.join(campos)} WHERE id=?"
    cursor.execute(sql, valores)

    conn.commit()
    conn.close()


def eliminar_usuario(id_usuario):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM usuarios WHERE id=?", (id_usuario,))
    conn.commit()
    conn.close()