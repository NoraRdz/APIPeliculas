import {pool} from '../../config/postgre.js';

/**
 * @module Models/peliculas/extraerCalificacionPeliculas
 * @description Obtiene todas las películas junto con su calificación promedio y total de reseñas.
 */

/**
 * Recupera la lista de películas con su calificación promedio
 * y la cantidad total de reseñas registradas.
 *
 * Si una película no tiene calificaciones:
 *  - `promedio_rating` será `null`
 *  - `total_reviews` será `0`
 *
 * @async
 * @function extraerCalificacionPeliculas
 *
 * @returns {Promise<Object[]>} Arreglo de objetos que contienen:
 * @returns {number} return[].id - ID de la película.
 * @returns {string} return[].title - Título de la película.
 * @returns {number|null} return[].promedio_rating - Promedio de calificaciones.
 * @returns {number} return[].total_reviews - Cantidad de reseñas.
 *
 * @throws {string} "Error en el servidor" si ocurre un problema en la consulta.
 */
export default async function extraerCalificacionPeliculas() {
  try {
    const query = `
      SELECT 
          m.id,
          m.title,
          AVG(r.rating) AS promedio_rating,
          COUNT(r.rating) AS total_reviews
      FROM movies AS m
      LEFT JOIN rating AS r ON r.movie_id = m.id
      GROUP BY m.id, m.title;
    `;

    const result = await pool.query(query);
    return result.rows;

  } catch (err) {
    console.error("Error al extraer calificaciones de películas:", err);
    throw "Error en el servidor";
  }
}
