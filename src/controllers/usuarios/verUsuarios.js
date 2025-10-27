import extraerUsuarios from "../../models/usuarios/extraerUsuarios.js";

export default async function verUsuarios(req,res) {
    try {
        const result =  await extraerUsuarios()

        res.status(200).json({
            result
        })

    } catch (error) {
        res.status(500).json({"message":"Hubo un error"})
    }
}