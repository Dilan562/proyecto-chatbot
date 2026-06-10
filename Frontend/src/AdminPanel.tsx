import { useEffect, useState } from "react";
import Carta from "./components/Cards";
import { Title } from "./components/Titulos";
import { Link } from "react-router-dom";




function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5000/admin/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error eliminando usuario");
        // Actualizar la lista en el frontend
        setUsers((prev) => prev.filter((u) => u.id !== id));
      })
      .catch((err) => console.error(err));}

  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((response) => response.json())
      .then((data) => {
        const adapted = data.map((u: any) => ({
          id: u.id,
          name: u.nombre_usuario,
          email: u.email,
          role: u.role,
        }));
        setUsers(adapted);
      })
      .catch((err) => console.error("Error cargando usuarios:", err));
  }, []);

  const [menu, setMenu] = useState<Carta[]>();

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((response) => response.json())
      .then((data) => setMenu(data))
      .catch((err) => console.error("Error cargando menú:", err));
  }, []); // <-- aquí el cambio

  return (
    <div>
      <div>
        {Title("Usuarios")}
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>{user.name}</strong> - {user.email} ({user.role})
              <Link to={`/ModUser/${user.id}`}>Editar</Link> |
              <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
      {Title("Menú")}
      <ul>
        {menu?.map((carta, id) => (
          <li key={id}>
            <strong>{carta.nombre_plato}</strong> - {carta.descripcion}, precio:
            {carta.precio} <Link to={`/ModCarta/${carta.id}`}>Editar</Link> | <button onClick={() => handleDelete(carta.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default AdminPanel;
