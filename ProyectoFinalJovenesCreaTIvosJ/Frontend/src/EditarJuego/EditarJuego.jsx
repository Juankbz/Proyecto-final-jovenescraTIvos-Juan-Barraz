import { useNavigate } from "react-router-dom";
import "./EditarJuego.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";


function EditarJuego() {
    const Navigate = useNavigate();
    const  {id}  = useParams();
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

    useEffect (() => {
  const cargarJuego = async () => {
    try {
      const res = await fetch(`http://localhost:3000/juegos/${id}`);
      const data = await res.json();
      setform(data); 
    } catch (error) {
      console.error("Error al cargar el juego:", error);
    }
  }
  cargarJuego();}, 

  
  
  [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res =  await fetch(`http://localhost:3000/editar-juegos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            console.log('Juego editado:', data);

            Navigate("/juegos");    
        } catch (error) {
            console.error('Error al editar el juego:', error);
        }
    }

    return (
        <div className="editar-juego-container">
            <h2>Editar Juego</h2>
            <form onSubmit  ={handleSubmit} className="editar-juego-form">
                <input type="text" name="imagen" placeholder="URL de la imagen" value={form.imagen} onChange={handleChange} required />
                <input type="text" name="nombre" placeholder="Nombre del juego" value={form.nombre} onChange={handleChange} required />
                <input type="text" name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
                <input type="text" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
                <textarea name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required></textarea>
                <input type="date" name="fecha" placeholder="Fecha de lanzamiento" value={form.fecha} onChange={handleChange} required />
                <button type="submit">Editar Juego</button>
            </form>
        </div>
    );

    


}
    
export default EditarJuego;