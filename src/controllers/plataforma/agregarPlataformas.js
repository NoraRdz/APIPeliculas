import insertarPlataforma from "../../models/plataforma/insertarPlataforma.js";

/**
 * Controlador para registrar una nueva plataforma en la base de datos.
 *
 * Este controlador recibe el nombre de la plataforma desde el cuerpo de la petición
 * y llama al modelo correspondiente para insertarla en la base de datos.
 *
 * @module Controller/plataformas/agregarPlataformas
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.plataforma - Nombre de la plataforma a registrar.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Devuelve una respuesta JSON indicando el resultado del registro.
 */
export default async function agregarPlataformas(req, res) {
    const { plataforma } = req.body;

    try {
        if (!plataforma) {
            return res.status(400).json({
                success: false,
                message: "El campo 'plataforma' es requerido"
            });
        }

        const result = await insertarPlataforma(plataforma);

        if (result.error) {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Plataforma registrada correctamente",
            data: result
        });

    } catch (error) {
        console.error("Error al insertar plataforma:", error);
        res.status(500).json({ error: "Error al insertar plataforma" });
    }
}
