import insertarUsuario from "../../models/usuarios/insertarUsuario.js";

/**
 * Controlador para registrar un nuevo usuario.
 * Valida que los campos requeridos estén presentes antes de llamar al modelo.
 *
 * @module agregarUsuario
 * @namespace Controllers
 * * @param {Object} req - Objeto de solicitud (request).
 * @param {Object} req.body - Cuerpo de la solicitud con {username, email, password}.
 * @param {Object} res - Objeto de respuesta (response).
 * * @returns {void} Retorna un JSON con el usuario creado o un mensaje de error.
 */
export default async function agregarUsuario(req,res){
    const usuario = req.body
    
     try {
        if(!usuario.username || !usuario.email || !usuario.password){
               return  res.status(400).json({
                "success": false,
                "message": "Faltan datos requeridos: username, email o password"
               })
        }
        
        const result = await insertarUsuario(usuario);
        // console.log(result)
             
       
        res.status(200).json({
           "success": true,
            "message": "Se realizo el registro del usuario correctamente",
            "data": result
        })

    } catch (error) {
        res.status(500).json({
            "success": false,
            "message": "Ocurrió un error inesperado",
        })
    }
}