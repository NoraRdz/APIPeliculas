import extraerPeliculasPlataforma from "../../models/peliculas/extraerPeliculasPlataforma.js";

/**
 * Controlador para obtener películas de una plataforma específica (por parámetros de ruta).
 *
 * @module verPeliculasPlataforma
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud.
 * @param {string} req.params.name - Nombre de la plataforma (ej. "Disney+").
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con la lista de películas de la plataforma.
 */
export default async function verPeliculasPlataforma(req,res) {
    // Nota: req.params devuelve un objeto, aquí deberías acceder a la propiedad específica, ej: req.params.name
    // En el código original se asignaba 'req.params' completo a 'name', lo cual podría causar error si el modelo espera un string.
    const { name } = req.params; 
    
    try {
        if(!name){
            return res.status(400).json({
                "success": false,
                "message": "Se debe especificar una plataforma"
            })
        }
        
        const result =  await extraerPeliculasPlataforma(name)
        
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