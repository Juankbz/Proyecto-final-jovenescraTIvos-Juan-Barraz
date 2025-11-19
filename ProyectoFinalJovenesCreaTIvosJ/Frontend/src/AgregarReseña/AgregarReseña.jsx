import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './AgregarReseña.css';

function AñadirReseña() {

    const Navigate = useNavigate();
    const {juegoId} = useParams();
    const [form, setform] = useState(

        {   
            autor: "",
            puntuacion: "",
            comentario: "",
            fecha: "",
            juegoId: juegoId
                        
        }
    );
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =  await fetch(`http://localhost:3000/añadir-reseñas/:juegoId`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            
            console.log('reseña añadida:', data);

            
        } catch (error) {
            console.error('Error al añadir el juego:', error);
        } 
        Navigate(`/reseñas/${juegoId}`)
    }

    return (
        <div className="reseña-container">
            <h2>Añadir Nueva Reseña</h2>
            <form onSubmit={handleSubmit} className="añadir-reseña-form">
                <input type="text" name="autor" placeholder="Autor de la reseña" value={form.autor} onChange={handleChange} required />
                <input type="text" name="puntuacion" placeholder="Puntuación" value={form.puntuacion} onChange={handleChange} required />
                <textarea name="comentario" placeholder="Comentario" value={form.comentario} onChange={handleChange} required></textarea>
                <input type="date" name="fecha" placeholder="Fecha de la reseña" value={form.fecha} onChange={handleChange} required />
                <button type="submit">Añadir reseña</button>
            </form>
        </div>
    );
}

export default AñadirReseña; 