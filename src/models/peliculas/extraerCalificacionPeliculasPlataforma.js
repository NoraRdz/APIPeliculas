/**
 * Módulo para obtener calificaciones filtradas por plataforma de streaming.
 * @module extraerCalificacionPeliculasPlataforma
 * @namespace Models
 * 
 */

import pool from '../../config/postgre.js'

/**
 * Obtiene la lista de películas y sus calificaciones filtradas por plataforma.
 *
 * Esta función consulta la base de datos para obtener las películas disponibles
 * en una plataforma específica, junto con su calificación promedio y el número total
 * de reseñas.  
 * Si una película no tiene calificaciones, `promedio_rating` será `null`
 * y `total_reviews` será `0`.
 *
 * @author Nora Adriana Rodríguez López
 *
 * @alias module:extraerCalificacionPeliculasPlataforma
 * @function
 *
 * @param {string} plataforma - Nombre de la plataforma (por ejemplo: "Netflix", "Disney+", "HBO").
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con la siguiente estructura:
 * - {number} id — ID de la película.
 * - {string} title — Título de la película.
 * - {string} p_name — Nombre de la plataforma.
 * - {number|null} promedio_rating — Calificación promedio de la película.
 * - {number} total_reviews — Número total de reseñas registradas.
 *
 * En caso de error, se retorna un mensaje de texto informando que hubo un problema.
 */
export default async function extraerCalificacionPeliculas(plataforma) {

  try {
    const result = await pool.query(
        `SELECT 
            m.id,
            m.title,
            p.p_name,
            AVG(r.rating) AS promedio_rating,
            COUNT(r.rating) AS total_reviews
        from movies AS m 
        LEFT JOIN rating AS r ON r.movie_id = m.id
        Left join platform_movie as pm on pm.movie_id = m.id
        left join platforms as p on pm.platform_id = p.id
        where p.p_name=$1
        GROUP BY m.id, m.title, p.p_name`,
        [plataforma]
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}