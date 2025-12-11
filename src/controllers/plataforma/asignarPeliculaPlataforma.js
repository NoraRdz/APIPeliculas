import insertarPeliculaEnPlataforma from "../../models/plataforma/insertarPeliculaEnPlataforma.js";

/**
 * Controlador para asignar una película a una plataforma.
 *
 * Este controlador recibe el título de la película, el nombre de la plataforma
 * y una fecha o dato de publicación, y luego llama al modelo correspondiente
 * para insertar la relación en la base de datos.
 *
 * @module Controller/plataforma/asignarPeliculaPlataforma
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.pelicula - Nombre o título de la película.
 * @param {string} req.body.plataforma - Nombre de la plataforma.
 * @param {string} req.body.publicacion - Fecha o información de publicación.
 *
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Devuelve una respuesta JSON indicando el resultado del registro.
 */
export default async function asignarPeliculaPlataforma(req, res) {
    const { pelicula, plataforma, publicacion } = req.body;

    try {
        // Validación correcta
        if (!pelicula || !plataforma || !publicacion) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'pelicula', 'plataforma' y 'publicacion' son requeridos"
            });
        }

        const result = await insertarPeliculaEnPlataforma(pelicula, plataforma, publicacion);

        if (result.error) {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Película asignada a plataforma correctamente",
            data: result
        });

    } catch (error) {
        console.error("Error al asignar película a plataforma:", error);
        res.status(500).json({
            success: false,
            error: "Error al asignar película a plataforma"
        });
    }
}
