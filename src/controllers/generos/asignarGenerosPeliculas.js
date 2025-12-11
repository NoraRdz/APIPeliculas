import insertarGeneroAPelicula from "../../models/generos/insertarGeneroAPelicula.js";

/**
 * Controlador para asignar un género a una película.
 *
 * Este controlador recibe el nombre/título de la película y el nombre del género,
 * luego llama al modelo correspondiente para registrar la relación en la base de datos.
 *
 * @module Controller/generos/asignarGenerosPeliculas
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud.
 * @param {string} req.body.pelicula - Título de la película.
 * @param {string} req.body.genero - Nombre del género a asignar.
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Devuelve una respuesta JSON indicando el resultado.
 */
export default async function asignarGenerosPeliculas(req, res) {
    const { pelicula, genero } = req.body;

    try {
        // Validación correcta
        if (!pelicula || !genero) {
            return res.status(400).json({
                success: false,
                message: "Los campos 'pelicula' y 'genero' son requeridos"
            });
        }

        const result = await insertarGeneroAPelicula(pelicula, genero);

        if (result?.error) {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Género asignado a la película correctamente",
            data: result
        });

    } catch (error) {
        console.error("Error al asignar género a película:", error);
        res.status(500).json({
            success: false,
            error: "Error al asignar género a la película"
        });
    }
}
