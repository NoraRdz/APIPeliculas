import actualizarCalificacion from "../../../models/calificaciones/actualizarCalificacion.js";

/**
 * Controlador para modificar una calificación existente.
 *
 * @module modificarCalificacion
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos actualizados (rating, review, etc.).
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con la calificación actualizada.
 */
export default async function modificarCalificacion(req,res){
    const data = req.body
     try {
            const result = await actualizarCalificacion(data);
            console.log(result)
            res.status(200).json({
                result
            })
    
        } catch (error) {
            res.status(500).json({"message":"Hubo un error"})
        }
}