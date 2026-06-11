import Carta from "./Carta"; // 👈 importa con el nombre correcto
import { useState, useEffect } from "react";

function Menu() {
  const [menu, setMenu] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenu(data);
        setIsLoading(false);
      })
      .catch((err) => console.error("Error cargando menú:", err));
  }, []);

  if (isLoading) {
    return <div>Cargando...</div>; // aquí podrías usar <Loading /> también
  }

  return (
    <div className="container mt-4">
  <div className="row">
    {menu.map((plato) => (
      <Carta
        key={plato.id}
        id={plato.id}
        nombre_plato={plato.nombre_plato}
        descripcion={plato.descripcion}
        precio={`$${plato.precio}`}
        imagen={plato.imagen}
        categoria={plato.categoria}
      />
    ))}
  </div>
</div>
  );
}

export default Menu;
