Menu de restaurante con IA funcionando como RAG

la ia responde de momento con un pdf llamado example1.pdf, se debe modificar para que lea proximamente un diccionario para hacerlo mas dinamico y menos estatico.
la conexion entre el frontend y backend ahora es estable, pero se debe activar la IA por aparte

Activar Frontend y Backend:

Terminal 1:
-cd Frontend
-npm run dev

Terminal 2:
-cd RAGIA
-venv\Scripts\activate
-python conexion.py

La ia se activa usando en terminal desde la carpeta /RAGIA con el comando:
ollama serve

consideraciones:
-se debe descargar la ia llama3 (recomendable usar la version de 8b) usando: ollama pull llama3 
-comprobar que se encuentra descargada usando: ollama list
-para usarla desde terminal: ollama run llama3 "mensaje"