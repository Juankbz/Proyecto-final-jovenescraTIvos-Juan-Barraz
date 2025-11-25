const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());

const MONGODB_URI = 'mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/JuanBarraza'
const conectarDB = async () => {

    try {
        await mongoose.connect(MONGODB_URI) 
        console.log('Base de datos conectada');
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
        process.exit(1);
    }
}

conectarDB();

const Games = require('./modelos/Games');
const Reseña = require("./modelos/reviews");


app.use(express.json());




app.get('/juegos/:id', async (req, res) => {

    const id = req.params.id;

         if (!id) {
        return res.send('colocar un id valido');
    }

    try{const juego = await Games.findById(id)
    res.json(juego);}
    catch(error){
        console.error('Error al obtener el juego ', error);
        res.status(500).send('Error al obtener los juegos');
    }
});

app.get('/juegos', async (req, res) => {

    try{const juego = await Games.find()
    res.json(juego);}
    catch(error){
        console.error('Error al obtener el juego ', error);
        res.status(500).send('Error al obtener los juegos');
    }
});

app.post('/agregar-juegos', async (req, res) => {

    try{
    const imagen = req.body.imagen;
    const nombre = req.body.nombre;
    const genero = req.body.genero;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;


    const juego = {
        imagen: imagen,
        nombre: nombre,
        genero: genero,
        precio: precio,
        descripcion: descripcion,
        fecha: fecha

    }; 

    const nuevoJuego = new Games(juego);
    await nuevoJuego.save();

    res.send("Juego agregado correctamente");
    } catch (error) {
        console.error('Error al agregar el juego', error);
        res.status(500).send('Error al agregar la tarea');
    }

    
});





app.put('/editar-juegos/:id', async (req, res) => {

    try{
    const id = req.params.id;
    const imagen = req.body.imagen;
    const nombre = req.body.nombre;
    const genero = req.body.genero;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;

         if (!id) {
        return res.send('colocar un id valido');
    }
    const juego = {
        imagen: imagen,
        nombre: nombre,
        genero: genero,
        precio: precio,
        descripcion: descripcion,
        fecha: fecha
    }; 

    const juegoActualizado = await  Games.findByIdAndUpdate(id, juego, { new: true });

    res.send(juegoActualizado);
    } catch (error) {
        console.error('Error al actualizar la informacion del juego', error);
        res.status(500).send('Error al actualizar la informacion del juego');
    }

});

app.delete('/eliminar-juegos/:id', async (req, res) => {

    try{
    const id = req.params.id;

         if (!id) {
        return res.send('colocar un id valido');
    }

    const juegoEliminado = await Games.findByIdAndDelete(id);

    res.send('Juego eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el Juego', error);
        res.status(500).send('Error al eliminar el Juego');
    }
});



app.post("/add-reviews/:juegoId", async (req, res) => {
    try {
        const autor = req.body.autor;
        const comentario = req.body.comentario;
        const puntuacion = req.body.puntuacion;
        const {juegoId} = req.params;

        const nuevaReseña = new Reseña({
            autor: autor,
            comentario: comentario,
            puntuacion: puntuacion,
            juegoId: juegoId
        });

        await nuevaReseña.save();

        res.send("Reseña agregada correctamente");
    } catch (error) {
        console.error("Error al agregar la reseña", error);
        res.status(500).send("Error al agregar la reseña");
    }
});

app.get ("/review/:id", async (req, res) => {

    const {id} = req.params;

         if (!id) {
        return res.send('colocar un id valido');
    }

    try{const reseña = await Reseña.findById(id)
    res.json(reseña);}
    catch(error){
        console.error('Error al obtener la reseña ', error);
        res.status(500).send('Error al obtener la reseña');
    } });

app.get("/reviews/:Id", async (req, res) => {
    try {
        const {Id} = req.params;

        const reseñas = await Reseña.find({ juegoId: Id});

        res.json(reseñas);

    } catch (error) {
        console.error("Error al obtener reseñas", error);
        res.status(500).send("Error al obtener reseñas");
    }
});

app.put("/edit-reviews/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const autor = req.body.autor;
        const comentario = req.body.comentario;
        const puntuacion = req.body.puntuacion;

        const nuevaData = {
            autor: autor,
            comentario: comentario,
            puntuacion: puntuacion
        };

        const reseñaActualizada = await Reseña.findByIdAndUpdate(
            id,
            nuevaData,
            { new: true }
        );

        res.json(reseñaActualizada);
    } catch (error) {
        console.error("Error al editar la reseña", error);
        res.status(500).send("Error al editar la reseña");
    }
});

app.delete("/delete-reviews/:id", async (req, res) => {
    try {
        const {id} = req.params;

        await Reseña.findByIdAndDelete(id);

        res.send("Reseña eliminada correctamente");
    } catch (error) {
        console.error("Error al eliminar la reseña", error);
        res.status(500).send("Error al eliminar la reseña");
    }
});







app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});