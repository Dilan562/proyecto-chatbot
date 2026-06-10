import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ModUser() {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 este hook permite redirigir

  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetch(`http://localhost:5000/admin/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          name: data.nombre_usuario,
          email: data.email,
          role: data.role,
        })
      );
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:5000/admin/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error actualizando usuario");
        return res.json();
      })
      .then(() => {
        alert("Usuario actualizado correctamente");
        navigate("/Admin"); // 👈 redirige al AdminPanel
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Rol:
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="usuario">Usuario</option>
        </select>
      </label>
      <br />
      <button type="submit">Guardar cambios</button>
    </form>
  );
}

export default ModUser;
