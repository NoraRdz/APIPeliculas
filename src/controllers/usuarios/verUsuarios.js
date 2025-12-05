/**
 * Controlador para obtener y retornar todos los usuarios registrados en la base de datos.
 * @namespace Controllers
 * @module verUsuarios
*/
import extraerUsuarios from "../../models/usuarios/extraerUsuarios.js";

/**
 * Llama a la función de modelo para obtener todos los usuarios y envía la respuesta al cliente.
 * @alias controller:extraerPeliculasGeneros
 * @function
 *
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @return {Promise<void>} No retorna ningún valor, pero envía una respuesta JSON al cliente.
 *
 *
 * Si ocurre un error en la conexión o consulta, retorna el mensaje "Error en el servidor".
 */
export default async function verUsuarios(req,res) {
    try {
        const result =  await extraerUsuarios()

         if(!result || result.length === 0){
        return res.status(404).json({
            "success": false,
            "message": "No existen usuarios registrados"
        })
        }
        res.status(200).json({
           "success": true,
            "message": "Usuarios obtenidos correctamente",
            "data": result
        })

    } catch (error) {
         res.status(500).json({
            "success": false,
            "message": "Ocurrió un error inesperado",
        })
    }
}