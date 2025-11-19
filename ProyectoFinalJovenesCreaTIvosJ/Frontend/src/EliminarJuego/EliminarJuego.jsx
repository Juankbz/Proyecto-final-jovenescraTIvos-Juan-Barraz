import React from "react";
import './EliminarJuego.css';


function EliminarJuego({ id, onDelete }) {
  const handleDelete = async () => {
    const confirmar = window.confirm("¿Seguro que quieres borrar el juego?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/eliminar-juegos/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(id); 
      } else {
        console.error("Error al borrar el juego");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-link">
      Borrar Juego
    </button>
  );
}
export default EliminarJuego;