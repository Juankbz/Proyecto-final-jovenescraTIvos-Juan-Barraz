import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Link} from 'react-router-dom';
import EditarJuego from "../EditarJuego/EditarJuego.jsx";
import AñadirJuego from "../AñadirJuego/AñadirJuego.jsx";
import GameCards from "../GameCards/GameCards.jsx";
import Reseñas from "../Reseñas/Reseñas.jsx";
import AgregarReseña from "../AgregarReseña/AgregarReseña.jsx";
import EditarReseña from "../EditarReseña/EditarReseña.jsx";
import "./App.css";


function App() {
  


  return ( 
    <Router>
     <header className="Menu">
        <div className="logo">
            <img src="./fotos/image-removebg-preview-2.png" alt="foto-del-logo" className="logo-de-juego" />
        </div>
        <div className="cajarutas">
        <Link to="/juegos" className = "rutas">Juegos</Link>
        <Link to="/añadir-juegos"  className = "rutas">Añadir juego</Link>
        
        </div>
        
            
    </header>
    <section className="video-intro">

    </section>


    <main className="games-wrapper">

    <Routes>
      <Route path="/añadir-juegos" element={<AñadirJuego />} />
      <Route path="/juegos" element={<GameCards />} />
      <Route path="/editar-juegos/:id" element={<EditarJuego />} />
      <Route path="/reseñas/:Id" element={<Reseñas />} />
      <Route path="/agregar-reseñas/:juegoId" element={<AgregarReseña />} />
      <Route path="/edit-reviews/:id" element={<EditarReseña />} />
      
      
    </Routes>

      
 
    

    </main>

    <footer>
    </footer>
    </ Router>
   

  )};


export default App;

