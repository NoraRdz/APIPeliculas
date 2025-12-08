import actualizarUsuario from "../../models/usuarios/actualizarUsuario.js";

/**
 * Controlador para actualizar los datos de un usuario.
 *
 * @module Controller/usuario/modificarUsuario
 * @param {Object} req - Objeto de solicitud.
 * @param {Object} req.body - Datos a actualizar (id obligatorio, demás opcionales).
 * @param {number} req.body.id - Identificador del usuario.
 * @param {Object} res - Objeto de respuesta.
 * @returns {void} JSON con el usuario actualizado.
 */
export default async function modificarUsuario(req,res){
    const usuario = req.body;
     try {
            const result = await actualizarUsuario(usuario);
            console.log(result)
            res.status(200).json({
                result
            })
    
        } catch (error) {
            res.status(500).json({"message":"Hubo un error"})
        }
}