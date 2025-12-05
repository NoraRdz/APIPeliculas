import pool from "../../config/postgre.js";

/**
 * Inserta un nuevo usuario en la base de datos.
 *
 * @module insertarUsuario
 * @namespace Models
 * * @param {Object} usuario - Objeto con los datos del usuario.
 * @param {string} usuario.username - Nombre de usuario.
 * @param {string} usuario.email - Correo electrónico.
 * @param {string} usuario.password - Contraseña (se recomienda que esté hasheada).
 * * @returns {Promise<Array<Object>|string>} Retorna el registro del usuario creado.
 * En caso de error, retorna el mensaje "Error en el servidor".
 */
export default async function insertarUsuario(usuario) {

    try {
    const result = await pool.query(
        `insert into users(username,email,password)
        values($1,$2,$3) RETURNING *`,
        [usuario.username,usuario.email,usuario.password]
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}