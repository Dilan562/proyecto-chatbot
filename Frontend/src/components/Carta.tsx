import "../Styles/Cards.css";
import logo from "../assets/hero.png";
import Loading from "./Loading";
import { useState } from "react";

type CartaProps = {
  id: number;
  nombre_plato: string;
  descripcion: string;
  precio: string | number;
  imagen?: File | string;
  categoria?: string;
  editable?: boolean;
  onChange?: (field: string, value: string) => void;
};

function Carta({
  nombre_plato,
  descripcion,
  precio,
  imagen,
  editable = false,
  onChange,
}: CartaProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  let imageSrc: string | null = null;
  if (imagen instanceof File) {
    imageSrc = URL.createObjectURL(imagen);
  } else if (typeof imagen === "string" && imagen.trim() !== "") {
    imageSrc = `http://localhost:5000/${imagen}`;
  } else {
    imageSrc = logo;
  }

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100">
        {!isImageLoaded && <Loading />}
        <img
          src={imageSrc || logo}
          className="card-img-top"
          alt={nombre_plato}
          onLoad={() => setIsImageLoaded(true)}
          style={{
            display: isImageLoaded ? "block" : "none",
            height: editable ? "auto" : "200px", // 👈 en edición se muestra tamaño original
            width: "100%",
            objectFit: editable ? "contain" : "cover", // 👈 en edición se adapta sin recorte
          }}
        />

        <div className="card-body">
          <h5 className="card-title">
            {editable ? (
              <input
                className="form-control"
                type="text"
                value={nombre_plato}
                onChange={(e) => onChange?.("nombre_plato", e.target.value)}
              />
            ) : (
              nombre_plato
            )}
          </h5>

          <p className="card-text">
            {editable ? (
              <textarea
                className="form-control"
                value={descripcion}
                onChange={(e) => onChange?.("descripcion", e.target.value)}
              />
            ) : (
              descripcion
            )}
          </p>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            {editable ? (
              <input
                className="form-control"
                type="text"
                value={precio}
                onChange={(e) => onChange?.("precio", e.target.value)}
              />
            ) : (
              precio
            )}
          </li>
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
  );
}

export default Carta;
