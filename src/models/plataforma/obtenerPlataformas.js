/**
 * Módulo para gestionar el catálogo de plataformas de streaming.
 * @module Models/plataforma/obtenerCatalogoPlataformas
 */

import pool from "../../config/postgre.js"

/**
 * Obtiene todas las plataformas o una plataforma específica según su ID.
 *
 * - Si no se proporciona `id`, la función retorna todo el catálogo de plataformas.
 * - Si se proporciona `id`, retorna únicamente la plataforma correspondiente.
 *
 * @alias module:obtenerCatalogoPlataformas
 * @function
 *
 * @param {number|string} [id] - (Opcional) Identificador de la plataforma.
 *
 * @returns {Promise<Array<Object>|string>} Arreglo de plataformas encontradas o un mensaje de error.
 * Cada plataforma incluye por lo general:
 * - {number} id — Identificador único.
 * - {string} p_name — Nombre de la plataforma.
 *
 * En caso de error, retorna "Error en el servidor".
 */
export default async function obtenerCatalogoPlataformas(id) {
  try {

    let query = "SELECT * FROM platforms";
    let params = [];

    if (id !== undefined) {
      query = "SELECT * FROM platforms WHERE id = $1";
      params = [id];
    }

    const result = await pool.query(query, params);

    console.table(result.rows);
    return result.rows;

  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
