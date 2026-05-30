import os, shutil
from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate
from upload_data import cargar_documentos, crear_vectorstore
from langchain_classic.chains.retrieval_qa.base import RetrievalQA

llm = OllamaLLM(model="llama3", temperature=0.2)

qa = None  # se inicializa vacío

def inicializar_rag(ruta_pdf: str):
    """Carga o recarga el vectorstore desde un PDF"""
    global qa

    # Si existe carpeta previa, eliminarla
    if os.path.exists("chroma_db_dir"):
        try:
            shutil.rmtree("chroma_db_dir")
        except PermissionError:
            # Si está bloqueada, fuerza borrado al reiniciar
            for root, dirs, files in os.walk("chroma_db_dir", topdown=False):
                for name in files:
                    try:
                        os.remove(os.path.join(root, name))
                    except Exception:
                        pass
                for name in dirs:
                    try:
                        os.rmdir(os.path.join(root, name))
                    except Exception:
                        pass
            shutil.rmtree("chroma_db_dir", ignore_errors=True)

    docs = cargar_documentos(ruta_pdf)
    vectorstore = crear_vectorstore(docs)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    prompt = PromptTemplate(
        template="""sé amable, responde sin usar tecnicismos como "segun el contexto, o segun el texto", solo responde las preguntas basadas en el siguiente contexto sin inventar nada que no exista en el texto: {context} pregunta: {question}""",
        input_variables=["context", "question"]
    )

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )

def responder_pregunta(pregunta: str):
    """Usa el QA ya inicializado"""
    global qa
    if qa is None:
        raise RuntimeError("El RAG no está inicializado. Llama a inicializar_rag primero.")
    respuesta = qa.invoke({"query": pregunta})
    metadata = [
        {"page": _.metadata['page'], "file": _.metadata['file_path']}
        for _ in respuesta["source_documents"]
    ]
    return {"respuesta": respuesta["result"], "fuentes": metadata}
