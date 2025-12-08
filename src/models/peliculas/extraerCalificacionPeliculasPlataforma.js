import pool from '../../config/postgre.js';

/**
 * @module Models/peliculas/extraerCalificacionPeliculasPlataforma
 * @description Obtiene películas y sus calificaciones, filtradas por plataforma.
 */

/**
 * Obtiene la lista de películas disponibles en una plataforma específica,
 * junto con su calificación promedio y número total de reseñas.
 *
 * Si una película no tiene calificaciones:
 *  - `promedio_rating` será `null`
 *  - `total_reviews` será `0`
 *
 * @async
 * @function extraerCalificacionPeliculasPlataforma
 *
 * @param {string} plataforma - Nombre de la plataforma (ej. "Netflix", "Disney+", "HBO").
 *
 * @returns {Promise<Object[]>} Arreglo de objetos que contienen:
 * @returns {number} return[].id - ID de la película.
 * @returns {string} return[].title - Título de la película.
 * @returns {string} return[].p_name - Nombre de la plataforma.
 * @returns {number|null} return[].promedio_rating - Promedio de rating.
 * @returns {number} return[].total_reviews - Cantidad de reseñas.
 *
 * @throws {string} "Error en el servidor" si ocurre un fallo en la consulta.
 *
 * @author
 * Nora Adriana Rodríguez López
 */
export default async function extraerCalificacionPeliculasPlataforma(plataforma) {
  try {
    const query = `
      SELECT 
          m.id,
          m.title,
          p.p_name,
          AVG(r.rating) AS promedio_rating,
          COUNT(r.rating) AS total_reviews
      FROM movies AS m 
      LEFT JOIN rating AS r ON r.movie_id = m.id
      LEFT JOIN platform_movie AS pm ON pm.movie_id = m.id
      LEFT JOIN platforms AS p ON pm.platform_id = p.id
      WHERE p.p_name = $1
      GROUP BY m.id, m.title, p.p_name;
    `;

    const result = await pool.query(query, [plataforma]);
    return result.rows;

  } catch (err) {
    console.error("Error al extraer calificaciones por plataforma:", err);
    throw "Error en el servidor";
  }
}
