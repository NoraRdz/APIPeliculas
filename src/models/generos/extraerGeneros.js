/**
 * Módulo para obtener el catálogo de géneros.
 * @module extraerGeneros
 * @namespace Models
 */

import pool from '../../config/postgre.js'

/**
 * Recupera todos los géneros disponibles en la base de datos.
 *
 * Esta función consulta la tabla `genre` y devuelve el listado completo
 * de categorías (por ejemplo: Acción, Comedia, Drama) sin ningún filtro.
 *
 * @alias module:extraerGeneros
 * @function
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos donde cada uno representa un género.
 * Generalmente incluye campos como:
 * - {number} id - Identificador del género.
 * - {string} nombre - Nombre del género.
 *
 * En caso de error, retorna el mensaje "Error en el servidor".
 */
export default async function extraerGeneros() {

  try {
    const result = await pool.query(
        `select * from genre`
    );

    // console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}