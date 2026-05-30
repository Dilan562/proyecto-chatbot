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

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => response.json())
      .then((data) => setMenu(data.carta));
  });

  return (
    <div className="container mt-4">
      <div className="row">
        {menu?.map((carta, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src={logo} className="card-img-top" alt="imagen" />
              <div className="card-body">
                <h5 className="card-title">{carta?.nombre_plato}</h5>
                <p className="card-text">{carta?.descripcion}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{carta?.precio}</li>
              </ul>
              <div className="card-body">
                <a href="#" className="card-link">
                  Ordenar
                </a>
                <a href="#" className="card-link">
                  Pedir para llevar
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carta;
