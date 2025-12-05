import InsertarCalificacion from "../../../models/calificaciones/InsertarCalificacion.js";

/**
 * Controlador para agregar una nueva calificación a una película.
 *
 * @module agregarCalificacion
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos de la calificación (userId, peliculaId, etc.).
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con la calificación creada.
 */
export default async function agregarCalificacion(req,res){
    const data = req.body
     try {
            const result = await InsertarCalificacion(data);
            console.log(result)
            res.status(200).json({
                result
            })
    
        } catch (error) {
            res.status(500).json({"message":"Hubo un error"})
        }
}