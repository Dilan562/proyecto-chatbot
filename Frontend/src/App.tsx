import MainTitle from "./components/Titulos";
import Menu from "./components/Menu";
import AdminPanel from "./AdminPanel";
import { useState } from "react";
import ModUser from "./components/ModUser";
import ModCarta from "./components/ModCarta";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [Debug, setDebug] = useState(true);

  if (Debug) {
    return (
      <>
        {MainTitle("Debug mode")}
        <button onClick={() => setDebug(false)}>Disable Debug Mode</button>
        <Router>
          <nav>
            <Link to="/Admin">Go to Admin Panel</Link>
            <br />
            <Link to="/Menu">Go to Menu</Link>
          </nav>
          <Routes>
            <Route path="/Menu" element={<Menu />} />
            <Route path="/Admin" element={<AdminPanel />} />
            <Route path="/ModUser/:id" element={<ModUser />} />
            <Route path="/ModCarta/:id" element={<ModCarta />} />
          </Routes>
        </Router>
      </>
    );
  }

  return (
    <>
      {MainTitle("Bienvenidos a Placitas")}
      <Menu />
      <button onClick={() => setDebug(true)}>Enable Debug Mode</button>
    </>
  );
}

export default App;
