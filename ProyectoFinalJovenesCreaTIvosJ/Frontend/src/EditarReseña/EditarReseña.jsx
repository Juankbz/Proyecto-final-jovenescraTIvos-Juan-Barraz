import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './EditarReseña.css';

function EditarReseña() {
    const Navigate = useNavigate();
    const  {id}  = useParams();
    const [form, setform] = useState(

        {   
            autor: "",
            puntuacion: "",
            comentario: "",
            fecha: ""
                        
        }
    );
    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        });
    } 
    useEffect (() => {
  const cargarReseña = async () => {
    try {
      const res = await fetch(`http://localhost:3000/review/${id}`);
      const data = await res.json();
      setform(data); 
    } catch (error) {
      console.error("Error al cargar la reseña:", error);
    }
  }
  cargarReseña();}, 

  
  
  [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =  await fetch(`http://localhost:3000/edit-reviews/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            console.log('Reseña editada:', data);

            Navigate(-1);    
        } catch (error) {
            console.error('Error al editar la reseña:', error);
        }
    }

    return (
        <div className="editar-reseña-container">
            <h2>Editar Reseña</h2>
            <form onSubmit={handleSubmit} className="editar-reseña-form">
                <input type="text" name="autor" placeholder="Autor de la reseña" value={form.autor} onChange={handleChange} required />
                <input type="text" name="puntuacion" placeholder="Puntuación (del 1 al 5)" value={form.puntuacion} onChange={handleChange} required />
                <textarea name="comentario" placeholder="Comentario" value={form.comentario} onChange={handleChange} required></textarea>
                <input type="date" name="fecha" placeholder="Fecha de la reseña" value={form.fecha} onChange={handleChange} required />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
}

export default EditarReseña;