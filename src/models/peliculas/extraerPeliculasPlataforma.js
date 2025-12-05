/**
 * Módulo para listar películas disponibles en una plataforma.
 * @module extraerPeliculasPlataforma
 * @namespace Models
 */

import pool from '../../config/postgre.js'

/**
 * Obtiene el catálogo de películas de una plataforma específica junto con su fecha de disponibilidad.
 *
 * Esta función realiza un JOIN entre las tablas `platform_movie`, `platforms` y `movies`
 * para filtrar y devolver únicamente los títulos asociados al nombre de la plataforma proporcionada.
 *
 * @alias module:extraerPeliculasPlataforma
 * @function
 *
 * @param {string} name - Nombre exacto de la plataforma a consultar (ej. "Netflix", "Amazon Prime").
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con la siguiente estructura:
 * - {string} platform — Nombre de la plataforma.
 * - {string} movie — Título de la película.
 * - {string|Date} available_since — Fecha desde la cual la película está disponible.
 *
 * Si ocurre un error en la base de datos, retorna el mensaje "Error en el servidor".
 */
export default async function extraerPeliculasPlataforma(name) {

  try {
    const result = await pool.query(
        `
        select p.p_name as platform, m.title as movie,pm.available_since
        from platform_movie as pm
        join platforms as p on (pm.platform_id=p.id)
        join movies as m on (pm.movie_id=m.id)
        where p.p_name= $1
        `,[name]
    );

    // console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}