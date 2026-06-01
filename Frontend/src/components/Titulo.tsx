import '../Styles/Titulo.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ChatComponent from './ConexionRag';
function Titulo() {
    return (
       <div className='Titulo'>
        <h1>Bienvenidos a Placitas</h1>
       <Router>
      <div style={{ padding: "20px" }}>            
        <Routes>
          <Route path="/" element={<ChatComponent />} />
        </Routes>
      </div>
    </Router>
       </div>
    )
}

export default Titulo