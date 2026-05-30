import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConexionRag from "./components/ConexionRag";
import './index.css'
import Titulo from './components/Titulo'
import Cards from './components/Cards'

function App() {

  

  return (
  <>
  <Titulo/>
  <Cards/>
  <Router>
      <div style={{ padding: "20px" }}>      
        {/* Botón que lleva a ConexionRag */}
        <Link to="/chat">
          <button style={{ padding: "10px 20px", marginTop: "10px" }}>
            Ir al Chat RAG
          </button>
        </Link>

        <Routes>
          <Route path="/chat" element={<ConexionRag />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
