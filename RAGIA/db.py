import sqlite3

DB_NAME = "menu.db"

def inicializar_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # Crear tabla si no existe
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS carta (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_plato TEXT NOT NULL,
        descripcion TEXT,
        precio REAL NOT NULL,
        imagen TEXT,
        categoria TEXT
    )
    """)

    # Verificar si ya hay datos
    cursor.execute("SELECT COUNT(*) FROM carta")
    count = cursor.fetchone()[0]

    if count == 0:  # Solo insertar si está vacía
        platos = [
            ("Pizza Margarita", "Pizza con queso mozzarella y albahaca fresca", 25.0, "imagenes/pizza.jpg", "Pizzas"),
            ("Hamburguesa Clásica", "Carne de res, queso cheddar, lechuga y tomate", 18.5, "imagenes/hamburguesa.jpg", "Hamburguesas"),
            ("Ensalada César", "Lechuga romana, pollo, crutones y aderezo César", 15.0, "imagenes/ensalada.jpg", "Ensaladas"),
            ("Pasta Carbonara", "Pasta con salsa de huevo, queso y panceta", 22.0, "imagenes/pasta.jpg", "Pastas"),
        ]
        cursor.executemany(
            "INSERT INTO carta (nombre_plato, descripcion, precio, imagen, categoria) VALUES (?, ?, ?, ?, ?)",
            platos
        )
        conn.commit()

    conn.close()
    print("Base de datos inicializada con menú de ejemplo.")


def obtener_carta():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre_plato, descripcion, precio, imagen, categoria FROM carta")
    rows = cursor.fetchall()
    conn.close()

    carta = []
    for row in rows:
        carta.append({
            "id": row[0],
            "nombre_plato": row[1],
            "descripcion": row[2],
            "precio": row[3],
            "imagen": row[4],
            "categoria": row[5]
        })
    return carta



def insertar_plato(nombre, descripcion, precio, imagen=None, categoria=None):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO carta (nombre_plato, descripcion, precio, imagen, categoria) VALUES (?, ?, ?, ?, ?)",
        (nombre, descripcion, precio, imagen, categoria)
    )
    conn.commit()
    conn.close()


def actualizar_plato(id_plato, nombre=None, descripcion=None, precio=None, imagen=None, categoria=None):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    campos = []
    valores = []
    if nombre:
        campos.append("nombre_plato=?")
        valores.append(nombre)
    if descripcion:
        campos.append("descripcion=?")
        valores.append(descripcion)
    if precio:
        campos.append("precio=?")
        valores.append(precio)
    if imagen:
        campos.append("imagen=?")
        valores.append(imagen)
    if categoria:
        campos.append("categoria=?")
        valores.append(categoria)

    valores.append(id_plato)
    sql = f"UPDATE carta SET {', '.join(campos)} WHERE id=?"
    cursor.execute(sql, valores)

    conn.commit()
    conn.close()


def eliminar_plato(id_plato):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("DELETE FROM carta WHERE id=?", (id_plato,))
    conn.commit()
    conn.close()
