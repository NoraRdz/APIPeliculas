import agregarPeliculas from "../../models/peliculas/agregarPeliculas.js";

export default async function postPeliculas(req,res){
    // console.log(req.body)
   const {titulo,estreno,sinopsis}=req.body
    try {
        const result = await agregarPeliculas(titulo,estreno,sinopsis)

        res.json({"resultado":result})
     } catch (error) {
        console.error("Error al insertar película:", error);
        res.status(500).json({ error: "Error al insertar película" });
    }
}