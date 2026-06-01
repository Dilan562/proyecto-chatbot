import os, shutil
from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate
from upload_data import cargar_documentos_db, crear_vectorstore
from langchain_classic.chains.retrieval_qa.base import RetrievalQA

llm = OllamaLLM(model="llama3", temperature=0.2)
qa = None

def inicializar_rag():
    global qa
    docs = cargar_documentos_db()
    vectorstore = crear_vectorstore(docs)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})
    prompt = PromptTemplate(
        template="""Responde preguntas sobre el menú usando este contexto: {context} 
        Pregunta: {question}""",
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
    global qa
    if qa is None:
        raise RuntimeError("El RAG no está inicializado. Llama a inicializar_rag primero.")
    respuesta = qa.invoke({"query": pregunta})
    metadata = [
        {"id": _.metadata.get("id"), "imagen": _.metadata.get("imagen")}
        for _ in respuesta["source_documents"]
    ]
    return {"respuesta": respuesta["result"], "fuentes": metadata}
