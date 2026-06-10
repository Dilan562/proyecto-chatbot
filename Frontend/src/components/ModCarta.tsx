import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ModCarta() {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 este hook permite redirigir

  const [formData, setFormData] = useState({
    nombre_plato: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/menu/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          nombre_plato: data.nombre_plato,
          descripcion: data.descripcion,
          precio: data.precio,
          imagen: data.imagen || "",
          categoria: data.categoria || "",
        }),
      );
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:5000/menu/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error actualizando carta");
        return res.json();
      })
      .then(() => {
        alert("Carta actualizada correctamente");
        navigate("/Admin"); // 👈 redirige al AdminPanel
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input
          type="text"
          name="nombre_plato"
          value={formData.nombre_plato}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Descripción:
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Precio:
        <input
          type="text"
          name="precio"
          value={formData.precio}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Imagen:
        <input
          type="text"
          name="imagen"
          value={formData.imagen}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Categoría:
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Guardar cambios</button>
    </form>
  );
}

export default ModCarta;
