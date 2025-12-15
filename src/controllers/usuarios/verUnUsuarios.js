import extraerUsuario from "../../models/usuarios/extraerUsuario.js";

/**
 * Controlador para buscar un usuario específico por su ID.
 *
 * @module Controller/usuario/verUnUsuario
 * @param {Object} req - Objeto de solicitud.
 * @param {string|number} req.params.id - ID del usuario a buscar.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con los datos del usuario encontrado.
 */
export default async function verUnUsuario(req,res){
    const {id} = req.params
    console.log(id)
     try {
            const result = await extraerUsuario(id);
            console.log(result)
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