import { obtenerCatalogoPeliculas } from "../../models/plataforma/obtenerPlataformas.js"; 

async function getPeliculas(req,res){

   const id = req.query.id;
    try {
        const peliculas = await obtenerCatalogoPeliculas(id);

        return res.status(200).json({
            success: true,
            data: peliculas
        });

    } catch (error) {
        console.error("Error al obtener las películas:", error);
        return res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
    
}

export default {getPeliculas}