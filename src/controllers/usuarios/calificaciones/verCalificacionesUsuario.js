import extraerCalificacionesUsuario from "../../../models/calificaciones/extraerCalificacionesUsuario.js";

/**
 * Controlador para obtener el historial de calificaciones de un usuario.
 *
 * @module Controller/usuario/calificaciones/verCalificacionesUsuario
 * @param {Object} req - Objeto de solicitud.
 * @param {string|number} req.params.id - ID del usuario.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con las reviews realizadas por el usuario.
 */
export default async function verCalificacionesUsuario(req,res){
    const {id} = req.params
    console.log(id)
     try {
            const result = await extraerCalificacionesUsuario(id);
            console.log(result)
            if(!result || result.length === 0){
            return res.status(404).json({
                "success": false,
                "message": "No existen calificaciones registradas de este usuario"
            })
            }
            res.status(200).json({
            "success": true,
                "message": "Calificaciones creadas obtenidos correctamente",
                "data": result
            })

        } catch (error) {
            res.status(500).json({
                "success": false,
                "message": "Ocurrió un error inesperado",
            })
        }
}