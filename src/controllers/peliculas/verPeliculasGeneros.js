import extraerPeliculasGeneros from "../../models/peliculas/extraerPeliculasGeneros.js";
import extraerPeliculasPorGeneros from "../../models/peliculas/extraerPeliculasPorGeneros.js";

/**
 * Controlador para gestionar la visualización de películas por género.
 *
 * - Si se envía `name` en los query params, filtra las películas pertenecientes a ese género.
 * - Si no se envía, devuelve el conteo total de películas agrupadas por género.
 *
 * @module Controller/peliculas/verPeliculasGeneros
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} [req.query.name] - Nombre del género a filtrar.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Envía un JSON con las películas filtradas o el listado de géneros con su conteo.
 */
export default async function verPeliculasGeneros(req, res) {
    const name = req.query.name;
    let result;

    try {
        if (name) {
            result = await extraerPeliculasGeneros(name);
        } else {
            result = await extraerPeliculasPorGeneros();
        }

        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "El género solicitado no existe o no tiene películas registradas."
            });
        }

        res.status(200).json({
            success: true,
            message: "Películas por género obtenidas correctamente.",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Ocurrió un error inesperado."
        });
    }
}
