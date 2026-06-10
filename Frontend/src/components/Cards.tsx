import { useEffect } from "react";
import { useState } from "react";
import logo from "../assets/hero.png";
import "../Styles/Cards.css";

interface Carta {
  id: number;
  nombre_plato: string;
  descripcion: string;
  precio: string;
}

function Carta() {
  const [menu, setMenu] = useState<Carta[]>();
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  fetch("http://localhost:5000/menu")
    .then((response) => response.json())
    .then((data) => {
      setMenu(data);
      setIsLoading(false);
    })
    .catch((err) => console.error("Error cargando menú:", err));
}, []);  // <-- aquí el cambio


if (isLoading) {
  return <div>Cargando...</div>;
}

  return (
<div className="container mt-4">
  <div className="row">
    {menu?.map((carta, index) => (
      <div 
        key={index} 
        className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
      >
        <div className="card h-100">
          <img src={logo} className="card-img-top" alt="imagen" />
          <div className="card-body">
            <h5 className="card-title">{carta?.nombre_plato}</h5>
            <p className="card-text">{carta?.descripcion}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{carta?.precio}</li>
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Ordenar</a>
            <a href="#" className="card-link">Pedir para llevar</a>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
}

export default Carta;
