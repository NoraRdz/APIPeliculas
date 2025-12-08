/**
 * Módulo para listar películas disponibles en una plataforma.
 * @module Models/peliculas/extraerPeliculasPlataforma
 */

import {pool} from '../../config/postgre.js'

/**
 * Obtiene el catálogo de películas pertenecientes a una plataforma específica,
 * junto con su fecha de disponibilidad.
 *
 * La consulta realiza un JOIN entre `platform_movie`, `platforms` y `movies`
 * para devolver únicamente las películas que están asociadas a la plataforma
 * cuyo nombre coincide con el parámetro proporcionado.
 *
 * @async
 * @function extraerPeliculasPlataforma
 * @param {string} name - Nombre exacto de la plataforma a consultar (ej. "Netflix", "Amazon Prime").
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con:
 * @property {string} platform — Nombre de la plataforma.
 * @property {string} movie — Título de la película.
 * @property {string|Date} available_since — Fecha desde la cual la película está disponible.
 *
 * En caso de error durante la consulta, devuelve el mensaje `"Error en el servidor"`.
 */
export default async function extraerPeliculasPlataforma(name) {

  try {
    const result = await pool.query(
      `
      SELECT 
        p.p_name AS platform, 
        m.title AS movie,
        pm.available_since
      FROM platform_movie AS pm
      JOIN platforms AS p ON pm.platform_id = p.id
      JOIN movies AS m ON pm.movie_id = m.id
      WHERE p.p_name = $1
      `,
      [name]
    );

    return result.rows;

  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
