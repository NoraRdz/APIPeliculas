import insertarCalificacionEnPelicula from "../../models/peliculas/insertarCalificacionEnPelicula.js";

/**
 * Controlador para registrar una calificación de una película en una plataforma.
 *
 * Este controlador recibe el ID de la película, el ID de la plataforma y la
 * calificación o publicación realizada por el usuario, y utiliza el modelo
 * correspondiente para insertarla en la base de datos.
 *
 * @module Controller/pelicula/agregarCalificacionPelicula
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {number} req.body.pelicula - ID de la película a calificar.
 * @param {number} req.body.plataforma - ID de la plataforma donde se publica la calificación.
 * @param {string|number} req.body.publicacion - Calificación, comentario u opinión.
 *
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Devuelve una respuesta JSON indicando el resultado del registro.
 */
export default async function agregarCalificacionPelicula(req, res) {
    const { pelicula, plataforma, publicacion } = req.body;

    try {
        if (!pelicula || !plataforma || !publicacion) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'pelicula', 'plataforma' y 'publicacion' son requeridos"
            });
        }

        const result = await insertarCalificacionEnPelicula(pelicula, plataforma, publicacion);

        if (result.error) {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Calificación registrada correctamente",
            data: result
        });

    } catch (error) {
        console.error("Error al insertar calificación:", error);
        res.status(500).json({ error: "Error al insertar calificación" });
    }
}
