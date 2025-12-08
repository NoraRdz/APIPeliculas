/**
 * Módulo para obtener la información de un usuario específico.
 * @module Models/usuarios/extraerUsuario
 */

import {pool} from '../../config/postgre.js'

/**
 * Busca un usuario en la base de datos por su ID.
 *
 * Esta función consulta la tabla `users` y devuelve el registro que coincide
 * con el ID proporcionado.
 *
 * @alias module:extraerUsuario
 * @function
 *
 * @param {number|string} id - Identificador único del usuario.
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo con el usuario encontrado.
 * El arreglo estará vacío si el usuario no existe.
 *
 * En caso de error, retorna "Error en el servidor".
 */
export default async function extraerUsuario(id) {

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
