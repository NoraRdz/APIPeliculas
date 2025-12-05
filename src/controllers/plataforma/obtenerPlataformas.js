import obtenerCatalogoPeliculas from "../../models/plataforma/obtenerPlataformas.js"; 

/**
 * Controlador para obtener plataformas.
 * Puede retornar todas las plataformas o una específica si se envía el ID por query.
 *
 * @module obtenerPlataformas
 * @namespace Controllers
 * * @param {Object} req - Objeto de solicitud.
 * @param {number} [req.query.id] - ID opcional de la plataforma a buscar.
 * @param {Object} res - Objeto de respuesta.
 * * @returns {void} Retorna JSON con la data de plataformas.
 */
export default async function obtenerPlataformas(req,res){

   const id = req.query.id;
    try {
        // Nota: el nombre del import 'obtenerCatalogoPeliculas' parece confuso si el archivo es obtenerPlataformas
        const plataformas = await obtenerCatalogoPeliculas(id);

        return res.status(200).json({
            success: true,
            data: plataformas
        });

    } catch (error) {
        console.error("Error al obtener las plataformas:", error);
        return res.status(500).json({
            success: false,
            message: "Hubo un error en el servidor."
        });
    }
}

