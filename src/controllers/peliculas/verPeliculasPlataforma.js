import extraerPeliculasPlataforma from "../../models/peliculas/extraerPeliculasPlataforma.js";

/**
 * Controlador para obtener las películas de una plataforma específica.
 *
 * Este controlador recibe el nombre de la plataforma mediante parámetros de ruta
 * y consulta el modelo correspondiente para recuperar las películas asociadas.
 *
 * @module Controller/peliculas/verPeliculasPlataforma
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.params.name - Nombre de la plataforma (ej. "Disney+").
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Envía una respuesta JSON con la lista de películas o un mensaje de error.
 */
export default async function verPeliculasPlataforma(req, res) {
    const { name } = req.params;

    try {
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Se debe especificar una plataforma"
            });
        }

        const result = await extraerPeliculasPlataforma(name);

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay películas en la plataforma solicitada"
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
