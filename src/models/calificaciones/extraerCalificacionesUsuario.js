import {pool} from '../../config/postgre.js';

/**
 * @module Models/calificaciones/extraerCalificacionesUsuario
 * @description Obtiene el historial de calificaciones realizadas por un usuario,
 * incluyendo el título de la película, la puntuación y la plataforma asociada.
 */

/**
 * Consulta las calificaciones realizadas por un usuario específico.
 *
 * Realiza un JOIN entre `rating`, `movies` y `platforms`, filtrando por el ID del usuario.
 * Devuelve el listado completo de las calificaciones realizadas.
 *
 * @async
 * @function extraerCalificacionesUsuario
 *
 * @param {number|string} id - ID del usuario cuyas calificaciones se desean obtener.
 *
 * @returns {Promise<Object[]>} Lista de calificaciones, cada una con:
 * @returns {string} return[].title - Título de la película.
 * @returns {number} return[].rating - Puntuación otorgada.
 * @returns {string} return[].p_name - Nombre de la plataforma.
 *
 * @throws {string} "Error en el servidor" Si ocurre un fallo en la consulta.
 */
export default async function extraerCalificacionesUsuario(id) {
  try {
    const query = `
      SELECT 
        m.title, 
        r.rating, 
        p.p_name
      FROM rating AS r
      INNER JOIN movies AS m ON r.movie_id = m.id
      INNER JOIN platforms AS p ON r.platform_id = p.id
      WHERE r.user_id = $1
      ORDER BY m.title ASC;
    `;

    const result = await pool.query(query, [id]);

    return result.rows;
  } catch (err) {
    console.error("Error al extraer calificaciones del usuario:", err);
    throw "Error en el servidor";
  }
}
