import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Reseñas.css';
import EliminarReview from '../EliminarReseña/EliminarReview';
import {useEffect, useState} from "react";



function Reviews() {
    const { Id } = useParams();
    const [reviews, setreviews] = useState([]);

    useEffect(() => {

    const CargarReseñas =  async () => {
        const res = await fetch(`http://localhost:3000/reviews/${Id}`);
        const data = await res.json();
        setreviews(data);
    };
    CargarReseñas();
    }, [Id]);
    
    return (
  <div className="review-container">
    {reviews.length === 0 ? (
      <p>No hay reseñas aún para este juego.</p>
    ) : (
      reviews.map((review) => (
        <div key={review._id} className="Re-card">
          <h3 className="autor">{review.autor}</h3>
          <p className="comentario">{review.comentario}</p>
          <p className="puntuacion">puntuacion:{review.puntuacion}</p>
          <p className="fecha">Released: {review.fecha}</p>
          <nav className="nav-links">
            <Link to={`/edit-reviews/${review._id}`} className="nav-link">Editar Reseña</Link>
            <EliminarReview id={review._id} onDelete={(id) => {
                    setreviews(reviews.filter(review => review._id !== id));
                }} />
          </nav>
        </div>
      ))
    )}
  </div>
);
}


export default Reviews;   
