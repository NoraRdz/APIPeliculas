import agregarPeliculas from "../../models/peliculas/agregarPeliculas.js";

/**
 * Controlador para registrar una nueva película en la base de datos.
 *
 * Este controlador se ejecuta después de que el middleware de validación ha verificado
 * que los datos enviados son correctos y que el archivo (si existe) ha sido procesado.
 * Recibe la información del cuerpo de la petición y llama al modelo encargado de realizar la inserción.
 *
 * @module Controller/peliculas/postPeliculas
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con los datos de la película.
 * @param {string} req.body.titulo - Título de la película.
 * @param {number|string} req.body.estreno - Año de estreno de la película.
 * @param {string} req.body.sinopsis - Sinopsis de la película.
 * @param {Object} [req.file] - Archivo procesado por Multer (opcional).
 * @param {Object} res - Objeto de respuesta de Express.
 *
 * @returns {void} Devuelve una respuesta JSON indicando el resultado del registro.
 */
export default async function postPeliculas(req, res) {
    const { titulo, estreno, sinopsis } = req.body;
    console.log(titulo, estreno, sinopsis);

    try {
        if (!titulo || !estreno || !sinopsis) {
            return res.status(400).json({
                success: false,
                message: "Ocurrió un error inesperado"
            });
        }

        const result = await agregarPeliculas(titulo, estreno, sinopsis);

        if (result.error) {
            return res.status(500).json({
                success: false,
                message: result.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Se realizó el registro de la película correctamente",
            data: result
        });

    } catch (error) {
        console.error("Error al insertar película:", error);
        res.status(500).json({ error: "Error al insertar película" });
    }
}
