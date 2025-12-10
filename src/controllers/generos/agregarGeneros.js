import insertarGenero from "../../models/generos/insertarGeneros.js";

/**
 * Controlador para registrar un nuevo género en la base de datos.
 *
 * Este controlador recibe el nombre del género desde el cuerpo de la petición
 * y llama al modelo correspondiente para insertarlo en la base de datos.
 *
 * @module Controller/generos/agregarGeneros
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.genero - Nombre del género a registrar.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Devuelve una respuesta JSON indicando el resultado del registro.
 */
export default async function agregarGeneros(req, res) {
    const { genero } = req.body;

    try {
        if (!genero) {
            return res.status(400).json({
                success: false,
                message: "El campo 'genero' es requerido"
            });
        }

        const result = await insertarGenero(genero);

        if (result.error) {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Género registrado correctamente",
            data: result
        });

    } catch (error) {
        console.error("Error al insertar género:", error);
        res.status(500).json({ error: "Error al insertar género" });
    }
}
