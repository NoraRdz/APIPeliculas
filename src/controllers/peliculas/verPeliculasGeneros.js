import extraerPeliculasGeneros from "../../models/peliculas/extraerPeliculasGeneros.js";
import extraerPeliculasPorGeneros from "../../models/peliculas/extraerPeliculasPorGeneros.js";

/**
 * Controlador para gestionar la visualización de películas por géneros.
 * - Si se envía `name` en query: filtra películas de ese género.
 * - Si no se envía: devuelve conteo de películas por género.
 *
 * @module verPeliculasGeneros
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud.
 * @param {string} [req.query.name] - Nombre del género para filtrar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con películas filtradas o lista de géneros con conteo.
 */
export default async function verPeliculasGeneros(req,res) {
    const name=req.query.name
    let result
    try {

        if(name){
            result =  await extraerPeliculasGeneros(name)
        }else{
            result =  await extraerPeliculasPorGeneros()
        }
        
        if(!result || result.length === 0){
        return res.status(404).json({
            "success": false,
            "message": "El genero de peliculas solicitado no existe"
        })
        }
        res.status(200).json({
           "success": true,
            "message": "Generos de peliculas obtenidos correctamente",
            "data": result
        })

    } catch (error) {
         res.status(500).json({
            "success": false,
            "message": "Ocurrió un error inesperado",
        })
    }
}