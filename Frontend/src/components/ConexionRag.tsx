import React, { useState } from "react";

const ChatComponent: React.FC = () => {
  const [input, setInput] = useState("");
  const [respuesta, setRespuesta] = useState("");

const enviarMensaje = async () => {
  console.log("Enviando:", input);
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mensaje: input }),
    });

    console.log("Respuesta cruda:", res);
    const data = await res.json();
    console.log("Respuesta JSON:", data);

    setRespuesta(data.respuesta);
  } catch (error) {
    console.error("Error en fetch:", error);
  }
};

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe tu pregunta"
      />
      <button onClick={enviarMensaje}>Enviar</button>
      <p>Respuesta: {respuesta}</p>
    </div>
  );
};

export default ChatComponent;