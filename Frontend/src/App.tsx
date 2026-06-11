import { Title } from "./components/Titulos";
import Chat from "./components/ConexionRag";
import Menu from "./components/Menu";
import AdminPanel from "./AdminPanel";
import ModUser from "./components/ModUser";
import ModCarta from "./components/ModCarta";
import Login from "./components/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

function App() {
  const isAuthenticated = !!sessionStorage.getItem("user");
  const role = sessionStorage.getItem("role");

  return (
    <Router>
      {/* Navbar simple */}
      <nav className="p-3 bg-light">
        <Link to="/" className="me-3">
          Menú
        </Link>

        {/* 👇 Mostrar Login solo si NO está autenticado */}
        {!isAuthenticated && (
          <Link to="/login" className="me-3">
            Login
          </Link>
        )}

        {/* 👇 Mostrar Admin Panel solo si es admin */}
        {isAuthenticated && role === "admin" && (
          <Link to="/Admin" className="me-3">
            Admin Panel
          </Link>
        )}

        {/* 👇 Mostrar Logout si está autenticado */}
        {isAuthenticated && (
          <button
            className="btn btn-sm btn-outline-danger ms-3"
            onClick={() => {
              sessionStorage.clear();
              window.location.href = "/"; // redirige al menú
            }}
          >
            Logout
          </button>
        )}
      </nav>

      <Routes>
        {/* Página principal: menú público */}
        <Route
          path="/"
          element={
            <>
              {Title("Menú del Restaurante")}
              <Chat/>
              <Menu />
            </>
          }
        />
        <Route path="/login" element={<Login />} />

        {/* Página de login */}
        <Route path="/login" element={<Login />} />

        {/* Panel de administrador protegido */}
        <Route
          path="/Admin"
          element={
            isAuthenticated && role === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Rutas de edición protegidas solo para admin */}
        <Route
          path="/ModUser/:id"
          element={
            isAuthenticated && role === "admin" ? (
              <ModUser />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/ModCarta/:id"
          element={
            isAuthenticated && role === "admin" ? (
              <ModCarta />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
