import "./EliminarReview.css";


function EliminarReview({id , onDelete}) {
 const handleDelete = async () => {
    const confirmar = window.confirm("¿Seguro que quieres borrar el juego?");
    if (!confirmar) return;

    try {
      const res = await fetch(`http://localhost:3000/delete-reviews/${id}`, {
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
      Borrar Reseña
    </button>
  );
}


export default EliminarReview;