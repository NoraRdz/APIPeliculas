/**
 * Módulo para obtener el listado completo de usuarios.
 * @module extraerUsuarios 
 * @namespace Models
*/

import pool from '../../config/postgre.js'

/**
 * Recupera todos los usuarios registrados en la base de datos.
 *
 * Esta función ejecuta una consulta a la tabla `users` sin ningún filtro,
 * devolviendo la información completa de todos los registros existentes.
 * Útil para listados administrativos o reportes generales.
 *
 * @alias module:extraerUsuarios
 * @function
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos, donde cada objeto
 * representa un usuario con todos sus campos (id, nombre, email, etc.).
 *
 * En caso de error de conexión o consulta, devuelve el mensaje "Error en el servidor".
 */
export default async function extraerUsuarios() {

  try {
    const result = await pool.query(
        'select * from users'
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}