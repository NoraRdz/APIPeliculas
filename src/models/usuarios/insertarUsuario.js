import pool from "../../config/postgre.js";

/**
 * Inserta un nuevo usuario en la base de datos.
 *
 * @module Models/usuarios/insertarUsuario
 *
 * @param {Object} usuario - Objeto con los datos del usuario.
 * @param {string} usuario.username - Nombre de usuario.
 * @param {string} usuario.email - Correo electrónico.
 * @param {string} usuario.password - Contraseña del usuario.
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo con el registro del usuario creado.
 * En caso de error, retorna el mensaje "Error en el servidor".
 */
export default async function insertarUsuario(usuario) {

  try {
    const result = await pool.query(
      `INSERT INTO users(username, email, password)
       VALUES($1, $2, $3)
       RETURNING *`,
      [usuario.username, usuario.email, usuario.password]
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
