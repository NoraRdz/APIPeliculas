import extraerCalificacionPeliculas from "../../models/peliculas/extraerCalificacionPeliculas.js";
import extraerCalificacionPeliculasPlataforma from "../../models/peliculas/extraerCalificacionPeliculasPlataforma.js";

/**
 * Controlador para ver películas junto con su promedio de calificación.
 * Permite filtrar por plataforma mediante query params.
 *
 * @module verCalificacionPeliculas
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud.
 * @param {string} [req.query.plataforma] - Nombre opcional de la plataforma para filtrar (ej. "Netflix").
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con estadísticas de calificación de las películas.
 */
export default async function verCalificacionPeliculas(req,res) {
    const plataforma = req.query.plataforma
    //Falta de una pelicula especifica
    console.log(plataforma)
    let result
    try {
        if(!plataforma){
            result =  await extraerCalificacionPeliculas()
        }else{
            result =  await extraerCalificacionPeliculasPlataforma(plataforma)
        }
        
          if(!result || result.length === 0){
            return res.status(404).json({
                "success": false,
                "message": "no hay peliculas en la plataforma solicitada"
            })
        }
        res.status(200).json({
           "success": true,
            "message": "Peliculas obtenidas correctamente",
            "data": result
        })

    } catch (error) {
         res.status(500).json({
            "success": false,
            "message": "Ocurrió un error inesperado",    
        })
    }
}