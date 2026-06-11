import React, { useState } from "react";

const ChatComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [respuesta, setRespuesta] = useState("");

  const enviarMensaje = async () => {
    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: input }),
      });

      const data = await res.json();
      setRespuesta(data.respuesta);
    } catch (error) {
      console.error("Error en fetch:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h3 className="mb-0">¿Tienes dudas? Pregunta a nuestra IA</h3>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta..."
            />
            <button
              className="btn btn-primary"
              onClick={enviarMensaje}
              disabled={!input.trim()}
            >
              Enviar
            </button>
          </div>

          {respuesta && (
            <div className="alert alert-success mt-3">
              <strong>Respuesta:</strong> {respuesta}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
