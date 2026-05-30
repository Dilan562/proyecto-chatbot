from langchain_ollama import OllamaLLM
from langchain_core.prompts import PromptTemplate
from upload_data import cargar_documentos, crear_vectorstore
from langchain_classic.chains.retrieval_qa.base import RetrievalQA

azul="\033[34m"
verde="\033[32m"
reset="\033[0m"

def iniciar_chat(ruta_pdf):
    llm = OllamaLLM(model="llama3", temperature=0.2)
    docs = cargar_documentos(ruta_pdf)
    vectorstore = crear_vectorstore(docs)  # siempre refresca
    
    retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

    custom_prompt_template="""responde las preguntas basadas en el siguiente contexto sin inventar nada que no exista en el texto: {context} pregunta: {question}"""
    prompt=PromptTemplate(template=custom_prompt_template, input_variables=["context", "question"])


    qa= RetrievalQA.from_chain_type(llm=llm,chain_type="stuff", retriever=retriever, return_source_documents=True, chain_type_kwargs={"prompt": prompt})

    print("Chat iniciado. Puedes hacer preguntas sobre el contenido del PDF.")
    while True:
        pregunta=input(f"{verde}Tú: {reset}")
        if pregunta.lower() == "salir":
            print("Chat finalizado.")
            break

        respuesta= qa.invoke({"query": pregunta})
        metadata=[]
        
        for _ in respuesta["source_documents"]:
            metadata.append((_.metadata['page'], _.metadata['file_path']))
        print(f"{azul}Respuesta: {reset}{respuesta['result']}")
        print(f"{azul}Fuentes: {reset}{metadata}")

if __name__ == "__main__":
    ruta_archivo="example1.pdf"
    iniciar_chat(ruta_archivo)
