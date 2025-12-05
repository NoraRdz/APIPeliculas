import eliminarCalificacion from "../../../models/calificaciones/eliminarCalificacion.js";

/**
 * Controlador para eliminar una calificación.
 * Requiere los IDs compuestos (usuario, película, plataforma) para identificar el registro.
 *
 * @module quitarCalificacion
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Objeto con {user_id, movie_id, platform_id}.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON confirmando la eliminación.
 */
export default async function quitarCalificacion(req,res){
    const data = req.body
     try {
            const result = await eliminarCalificacion(data);
            console.log(result)
            res.status(200).json({
                result
            })
    
        } catch (error) {
            res.status(500).json({"message":"Hubo un error"})
        }
}