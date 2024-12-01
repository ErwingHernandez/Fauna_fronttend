import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import GetallFauna from './components/Getallfauna';
import Inicio from './components/Inicio';
import Foro from './components/Foro';
import './App.css';

function App() {
  
 return(
  <Router>
    <div>
      <nav>
        <Link to="/">Inicio</Link> | <Link to="/TodaFauna">Fauna</Link> | <Link to="/Foro">Foro</Link>
      </nav>
    <Routes>
      <Route path="/" element={<Inicio/>} />
      <Route path="/TodaFauna" element={<GetallFauna/>} />
      <Route path="/Foro" element={<Foro/>} />
    </Routes>
    </div>
  </Router>
 )
}

export default App;
