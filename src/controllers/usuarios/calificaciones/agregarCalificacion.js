import InsertarCalificacion from "../../../models/calificaciones/InsertarCalificacion.js";

/**
 * Controlador para agregar una nueva calificación a una película.
 *
 * @module Controller/usuario/calificaciones/agregarCalificacion
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos de la calificación (userId, peliculaId, etc.).
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con la calificación creada.
 */
export default async function agregarCalificacion(req, res) {
  const data = req.body;

  try {
    const result = await InsertarCalificacion(data);

    console.log(result);
    if (result.success === false) {
      return res.status(401).json(result); 
    }

    // ✅ Todo correcto
    return res.status(201).json({
        success: true,
        message: "Calificación agregada",
        data: result
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Hubo un error en el servidor" });
  }
}
