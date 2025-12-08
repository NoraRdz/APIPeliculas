import extraerPeliculas from "../../models/peliculas/extraerPeliculas.js";

/**
 * Controlador para obtener el catálogo completo de películas.
 * Valida si existen resultados y retorna el listado o un error 404.
 *
 * @module Controller/peliculas/verPeliculas
 *
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} Envía una respuesta JSON con el listado de películas.
 */
export default async function verPeliculas(req, res) {
    try {
        const result = await extraerPeliculas();

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay películas disponibles"
            });
        }

        res.status(200).json({
            success: true,
            message: "Películas obtenidas correctamente",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Ocurrió un error inesperado"
        });
    }
}
