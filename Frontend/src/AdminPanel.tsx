import { useEffect, useState } from "react";
import { Title } from "./components/Titulos";
import { Link } from "react-router-dom";

function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [menu, setMenu] = useState<any[]>([]);

  const handleDeleteUser = (id: number) => {
    fetch(`http://localhost:5000/admin/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error eliminando usuario");
        setUsers((prev) => prev.filter((u) => u.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteMenu = (id: number) => {
    fetch(`http://localhost:5000/menu/${id}`, { method: "DELETE" })
      .then((res) => {
        if (!res.ok) throw new Error("Error eliminando plato");
        setMenu((prev) => prev.filter((m) => m.id !== id));
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((response) => response.json())
      .then((data) => {
        const adapted = data.map((u: any) => ({
          id: u.id,
          name: u.nombre_usuario,
          email: u.email,
          role: u.role,
          imagen: u.imagen,
        }));
        setUsers(adapted);
      })
      .catch((err) => console.error("Error cargando usuarios:", err));

    fetch("http://localhost:5000/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error cargando menú:", err));
  }, []);

  return (
    <div className="container mt-4">
      {Title("Usuarios")}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex align-items-center justify-content-between"
          >
            <div className="d-flex align-items-center">
              {/*<img
                src={
                  user.imagen
                    ? `http://localhost:5000/${user.imagen}`
                    : "/default-user.png"
                }
                alt={user.name}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "15px",
                }}
              />*/}
              <div>
                <strong>{user.name}</strong>
                <p className="mb-0">{user.email}</p>
                <small>Rol: {user.role}</small>
              </div>
            </div>
            <div>
              <Link to={`/ModUser/${user.id}`} className="btn btn-sm btn-primary me-2">
                Editar
              </Link>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="btn btn-sm btn-danger"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {Title("Menú")}
      <div className="row">
        {menu.map((carta) => (
          <div
            key={carta.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
          >
            <div className="card h-100">
              <img
                src={
                  carta.imagen
                    ? `http://localhost:5000/${carta.imagen}`
                    : "/default-food.png"
                }
                alt={carta.nombre_plato}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <div className="card-body">
                <h5 className="card-title">{carta.nombre_plato}</h5>
                <p className="card-text">{carta.descripcion}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Precio: ${carta.precio}</li>
              </ul>
              <div className="card-body">
                <Link to={`/ModCarta/${carta.id}`} className="btn btn-sm btn-primary me-2">
                  Editar
                </Link>
                <button
                  onClick={() => handleDeleteMenu(carta.id)}
                  className="btn btn-sm btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPanel;
