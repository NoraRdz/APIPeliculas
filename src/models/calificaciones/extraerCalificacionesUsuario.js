/**
 * Módulo para obtener el historial de calificaciones de un usuario.
 * @module extraerCalificacionesUsuario
 * @namespace Models
 */

import pool from '../../config/postgre.js'

/**
 * Consulta las calificaciones realizadas por un usuario específico.
 *
 * Esta función recupera el historial de actividad de un usuario, mostrando
 * qué películas ha calificado, qué puntaje les dio y en qué plataforma.
 * Realiza un JOIN entre las tablas `rating`, `movies` y `platforms` filtrando
 * por el ID del usuario proporcionado.
 *
 * @alias module:extraerCalificacionesUsuario
 * @function
 *
 * @param {number|string} id - Identificador único del usuario (user_id).
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con la siguiente estructura:
 * - {string} title — Título de la película calificada.
 * - {number} rating — Puntuación otorgada por el usuario.
 * - {string} p_name — Nombre de la plataforma asociada.
 *
 * En caso de error en la consulta, retorna el mensaje "Error en el servidor".
 */
export default async function extraerCalificacionesUsuario(id) {

  try {
    const result = await pool.query(
        `select m.title, r.rating, p.p_name 
        from rating as r
        join movies as m on (r.movie_id = m.id)
        join platforms as p on (r.platform_id=p.id)
        where user_id=$1`,
        [id]
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}