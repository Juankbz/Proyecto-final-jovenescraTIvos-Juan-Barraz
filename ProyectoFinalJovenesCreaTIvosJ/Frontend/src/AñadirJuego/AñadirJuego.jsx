import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './AñadirJuego.css';

function AñadirJuego() {

    const Navigate = useNavigate();
    const [form, setform] = useState(

        {   
            
            imagen: "",
            nombre: "",
            genero: "",
            precio: "",
            descripcion: "",
            fecha: ""
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
            const res =  await fetch('http://localhost:3000/agregar-juegos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            
            console.log('Juego añadido:', data);

            
        } catch (error) {
            console.error('Error al añadir el juego:', error);
        } 
        Navigate("/juegos")
    }

    return (
        <div className="añadir-juego-container">
            <h2>Añadir Nuevo Juego</h2>
            <form onSubmit={handleSubmit} className="añadir-juego-form">
                <input type="text" name="imagen" placeholder="URL de la imagen" value={form.imagen} onChange={handleChange} required />
                <input type="text" name="nombre" placeholder="Nombre del juego" value={form.nombre} onChange={handleChange} required />
                <input type="text" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
                <input type="text" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required></textarea>
                <input type="date" name="fecha" placeholder="Fecha de lanzamiento" value={form.fecha} onChange={handleChange} required />
                <button type="submit">Añadir Juego</button>
            </form>
        </div>
    );
}

export default AñadirJuego; 
