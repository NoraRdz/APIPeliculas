import actualizacionParcialCalificacion from "../../../models/calificaciones/actualizacionParcialCalificacion.js";

/**
 * 💡 Controlador para el método PATCH: Modifica parcialmente una calificación existente.
 * @module Controller/usuario/calificaciones/modificarCalificacion
 * @param {Object} req - Objeto de solicitud. Se esperan los IDs y los campos a actualizar en req.body.
 * @param {Object} req.body - { calificacion?, comentario?, plataforma_id?, usuarioId, peliculaId }.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con la calificación actualizada o error.
 */
export default async function modificarParteCalificacion(req, res) {
    const data = req.body;

    if (!data.usuarioId || !data.peliculaId) {
        return res.status(400).json({
            message: "Datos incompletos. Se requieren 'usuarioId' y 'peliculaId' para identificar la calificación."
        });
    }

    try {
        const result = await actualizacionParcialCalificacion(data);

        if (result && result.length > 0) {
            // Éxito. Código 200 OK.
            return res.status(200).json({
                message: "Calificación actualizada correctamente",
                data: result[0] 
            });
        } else {
            return res.status(404).json({
                message: "No se encontró la calificación para el usuario y película especificados."
            });
        }
    } catch (error) {
        console.error("Error en modificarCalificacion:", error);
        return res.status(500).json({ "message": "Hubo un error interno al intentar modificar la calificación." });
    }
}