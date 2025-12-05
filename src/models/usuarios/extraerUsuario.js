/**
 * Módulo para obtener la información de un usuario específico.
 * @module extraerUsuario
 * @namespace Models
 */

import pool from '../../config/postgre.js'

/**
 * Busca un usuario en la base de datos por su ID.
 *
 * Esta función realiza una consulta a la tabla `users` para recuperar
 * todos los datos almacenados asociados al identificador proporcionado.
 *
 * @alias module:extraerUsuario
 * @function
 *
 * @param {number|string} id - Identificador único del usuario que se desea buscar.
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo que contiene el objeto del usuario encontrado.
 * El objeto incluirá todas las columnas de la tabla `users` (ej. id, username, email, etc.).
 * Si el usuario no existe, el arreglo devuelto estará vacío.
 *
 * En caso de error en la consulta, retorna el mensaje "Error en el servidor".
 */
export default async function extraerUsuario(id) {

  try {
    const result = await pool.query(
        'select * from users where id = $1',
        [id]
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}