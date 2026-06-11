import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ModUser() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
        navigate("/Admin");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Editar Usuario</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="admin">Admin</option>
                <option value="usuario">Usuario</option>
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success">
                Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/Admin")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModUser;
