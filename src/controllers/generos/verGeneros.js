import extraerGeneros from "../../models/generos/extraerGeneros.js";

/**
 * Controlador para obtener el listado de todos los géneros.
 *
 * @module Controllers/generos/verGeneros
 *
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 *
 * @returns {void} Envía una respuesta JSON con el arreglo de géneros.
 */
export default async function verGeneros(req, res) {
    try {
        const result = await extraerGeneros();

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Hubo un error al obtener los géneros"
        });
    }
}
