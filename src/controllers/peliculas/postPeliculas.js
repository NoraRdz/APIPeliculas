import agregarPeliculas from "../../models/peliculas/agregarPeliculas.js";

/**
 * Controlador para registrar una nueva película en la base de datos.
 * * Este controlador se ejecuta después de que el middleware de validación ha confirmado
 * que los datos son correctos y que el archivo (si se envió) ha sido procesado.
 * Recibe los datos del cuerpo de la petición y llama al modelo para la inserción.
 *
 * @module postPeliculas
 * @namespace Controllers
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} req.body - Cuerpo de la solicitud con los datos de la película.
 * @param {string} req.body.titulo - Título de la película.
 * @param {number|string} req.body.estreno - Año de estreno.
 * @param {string} req.body.sinopsis - Sinopsis de la película.
 * @param {Object} [req.file] - Objeto del archivo procesado por Multer (opcional, dependiendo de la lógica de negocio).
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {void} Retorna un JSON confirmando el registro o un mensaje de error.
 */
export default async function postPeliculas(req, res) {
    // console.log(req.body)
    const { titulo, estreno, sinopsis } = req.body;
    console.log(titulo, estreno, sinopsis);
    try {
        if (!titulo || !estreno || !sinopsis) {
            return res.status(400).json({
                "success": false,
                "message": "Ocurrió un error inesperado"
            });
        }
        const result = await agregarPeliculas(titulo, estreno, sinopsis);

        if (result.error) {
            return res.status(500).json({
                "success": false,
                "message": result.message
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Se realizo el registro de la pelicula correctamente",
            "data": result
        });
    } catch (error) {
        console.error("Error al insertar película:", error);
        res.status(500).json({ error: "Error al insertar película" });
    }
}