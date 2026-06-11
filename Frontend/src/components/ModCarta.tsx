import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Carta from "./Carta";

function ModCarta() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    nombre_plato: "",
    descripcion: "",
    precio: "",
    imagen: "",
    categoria: "",
    file: null,
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
          file: null,
        })
      );
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file, imagen: "" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("nombre_plato", formData.nombre_plato);
    data.append("descripcion", formData.descripcion);
    data.append("precio", formData.precio);
    data.append("categoria", formData.categoria);
    if (formData.file) {
      data.append("imagen", formData.file);
    }

    fetch(`http://localhost:5000/menu/${id}`, {
      method: "PUT",
      body: data,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error actualizando carta");
        return res.json();
      })
      .then(() => {
        alert("Carta actualizada correctamente");
        navigate("/Admin");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mt-4">
      {/* Render de la carta */}
      <div className="mb-4">
        <Carta
          id={Number(id)}
          nombre_plato={formData.nombre_plato}
          descripcion={formData.descripcion}
          precio={formData.precio}
          imagen={formData.file ? formData.file : formData.imagen}
          categoria={formData.categoria}
          editable={true}
          onChange={(field, value) => setFormData({ ...formData, [field]: value })}
        />
      </div>

      {/* Formulario estilizado */}
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4>Editar Plato</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre_plato"
                className="form-control"
                value={formData.nombre_plato}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <input
                type="text"
                name="descripcion"
                className="form-control"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="text"
                name="precio"
                className="form-control"
                value={formData.precio}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen</label>
              {formData.file ? (
                <img
                  src={URL.createObjectURL(formData.file)}
                  alt="Vista previa"
                  className="img-thumbnail mb-2"
                  style={{ width: "150px", height: "auto" }}
                />
              ) : formData.imagen ? (
                <img
                  src={`http://localhost:5000/${formData.imagen}`}
                  alt="Imagen guardada"
                  className="img-thumbnail mb-2"
                  style={{ width: "150px", height: "auto" }}
                />
              ) : (
                <p className="text-muted">Insertar imagen</p>
              )}
              <input
                className="form-control"
                type="file"
                name="imagen"
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <input
                type="text"
                name="categoria"
                className="form-control"
                value={formData.categoria}
                onChange={handleChange}
              />
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

export default ModCarta;
