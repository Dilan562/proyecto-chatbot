import os
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.embeddings import FastEmbedEmbeddings
from langchain_community.vectorstores import Chroma

def cargar_documentos(ruta_pdf):
    if not os.path.exists(ruta_pdf):
        raise FileNotFoundError(f"El archivo {ruta_pdf} no existe.")
    loader=PyMuPDFLoader(ruta_pdf)
    data_pdf=loader.load() 
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=2000, chunk_overlap=500)
    docs=text_splitter.split_documents(data_pdf)
    return docs
def crear_vectorstore(docs):
    import shutil
    persist_dir = "chroma_db_dir"
    if os.path.exists(persist_dir):
        shutil.rmtree(persist_dir)  # borra la base anterior
    
    embed_model = FastEmbedEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = Chroma.from_documents(
        documents=docs,
        embedding=embed_model,
        persist_directory=persist_dir,
        collection_name="example_collection"
    )
    return vectorstore