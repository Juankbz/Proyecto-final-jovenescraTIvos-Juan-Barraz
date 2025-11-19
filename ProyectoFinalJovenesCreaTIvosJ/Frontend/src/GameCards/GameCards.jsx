import { Link } from 'react-router-dom';
import './GameCards.css';
import {useEffect, useState} from "react";
import EliminarJuego from '../EliminarJuego/EliminarJuego';
import Reviews from '../Reseñas/Reseñas';


function GameCards() {
    const [games, setGames] = useState([]);

    useEffect(() => {

    const CargarJuegos =  async () => {
        const res = await fetch('http://localhost:3000/juegos');
        const data = await res.json();
        setGames(data);
    };
    CargarJuegos();
    }, []);
    
    return (
    <div className="game-cards-container">
        {games.map((game) => (
            
            <div key={game._id} className="game-card">
                <img src={game.imagen} alt={game.nombre} className="game-image" />
                <h3 className="game-title">{game.nombre}</h3>
                <p className="game-genre">{game.genero}</p>
                <p className="game-price">${game.precio}</p>
                <p className="game-description">{game.descripcion}</p>
                <p className="game-release-date">Released: {game.fecha}</p>
               
                <Link to={`/editar-juegos/${game._id}`} className="edit-link">Editar Juego</Link>
                <br></br>
                <EliminarJuego id={game._id} onDelete={(id) => {
                    setGames(games.filter(game => game._id !== id));
                }} />
                <br />
                <Link to={`/reseñas/${game._id}`} className="review-link">Ver Reseñas</Link>
                <br />
                <Link to={`/agregar-reseñas/${game._id}`} className="add-review-link">Añadir Reseña</Link>

            </div>
        ))}
    </div>
);

}


export default GameCards;   
