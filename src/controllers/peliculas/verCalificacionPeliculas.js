import extraerCalificacionPeliculas from "../../models/peliculas/extraerCalificacionPeliculas.js";
import extraerCalificacionPeliculasPlataforma from "../../models/peliculas/extraerCalificacionPeliculasPlataforma.js";

/**
 * Controlador para obtener películas junto con su calificación promedio.
 * Permite aplicar un filtro opcional mediante el nombre de una plataforma.
 *
 * @module Controller/peliculas/verCalificacionPeliculas
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} [req.query.plataforma] - Nombre opcional de la plataforma para filtrar (ej.: "Netflix").
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Envía una respuesta JSON con el listado de películas y sus estadísticas.
 */
export default async function verCalificacionPeliculas(req, res) {
    const plataforma = req.query.plataforma;
    let result;

    try {
        if (!plataforma) {
            result = await extraerCalificacionPeliculas();
        } else {
            result = await extraerCalificacionPeliculasPlataforma(plataforma);
        }

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
