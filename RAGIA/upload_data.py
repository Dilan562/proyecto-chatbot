import sqlite3
from langchain_core.documents import Document
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_community.vectorstores import Chroma

def cargar_documentos_db():
    conn = sqlite3.connect("menu.db")
    cursor = conn.cursor()
    cursor.execute("SELECT id, nombre_plato, descripcion, precio, imagen FROM carta")
    rows = cursor.fetchall()
    conn.close()

    docs = []
    for row in rows:
        contenido = f"{row[1]}: {row[2]} - Precio: {row[3]}"
        metadata = {"id": row[0], "imagen": row[4]}
        docs.append(Document(page_content=contenido, metadata=metadata))
    return docs

def crear_vectorstore(docs):
    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embed_model,
        persist_directory="chroma_db_dir",
        collection_name="menu_collection"
    )
    return vectorstore
