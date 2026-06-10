import '../Styles/Titulo.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ChatComponent from './ConexionRag';
function MainTitle(Body: string) {
    return (
       <div className='Titulo'>
        <h1>{Body}</h1>
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

function Title(Body: string) {
    return (
        <div className='Titulo'>
            <h1>{Body}</h1>
        </div>
    )
}


export default MainTitle; export { Title }