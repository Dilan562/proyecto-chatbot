export async function fetchUsers() {
  const response = await fetch("http://localhost:5000/admin");
  if (!response.ok) {
    throw new Error("Error al cargar usuarios");
  }
  return response.json();
}

export async function fetchCarta() {
  const response = await fetch("http://localhost:5000/");
  if (!response.ok) {
    throw new Error("Error al cargar carta");
  }
  return response.json();
}

export async function sendChatMessage(mensaje: string) {
  const response = await fetch("http://localhost:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mensaje }),
  });
  if (!response.ok) {
    throw new Error("Error al enviar mensaje");
  }
  return response.json();
}