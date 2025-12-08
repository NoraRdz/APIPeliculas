import {pool} from '../../config/postgre.js';

/**
 * @module Models/generos/extraerGeneros
 * @description Obtiene el catálogo completo de géneros disponibles en la base de datos.
 */

/**
 * Recupera todos los géneros registrados en la tabla `genre`.
 *
 * @async
 * @function extraerGeneros
 *
 * @returns {Promise<Object[]>} Arreglo de géneros, cada uno con:
 * @returns {number} return[].id - ID del género.
 * @returns {string} return[].nombre - Nombre del género.
 *
 * @throws {string} "Error en el servidor" si ocurre un fallo durante la consulta.
 */
export default async function extraerGeneros() {
  try {
    const result = await pool.query(`
      SELECT * FROM genre;
    `);

    return result.rows;
  } catch (err) {
    console.error("Error al extraer géneros:", err);
    throw "Error en el servidor";
  }
}
