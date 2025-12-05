import pool from "../../config/postgre.js";

/**
 * Registra una nueva calificación para una película en una plataforma específica.
 * Verifica mediante `WHERE NOT EXISTS` que el usuario no haya calificado ya esa película en esa plataforma.
 *
 * @module InsertarCalificacion
 * @namespace Models
 * * @param {Object} data - Datos de la calificación.
 * @param {number} data.userId - ID del usuario.
 * @param {number} data.peliculaId - ID de la película.
 * @param {number} data.platformaId - ID de la plataforma.
 * @param {number} data.calificacion - Puntuación asignada (ej. 1-5).
 * @param {string} data.comentario - Reseña o comentario del usuario.
 * * @returns {Promise<Array<Object>|string>} Retorna el registro insertado o vacío si ya existía.
 */
export default async function InsertarCalificacion(data) {

  try {
    const result = await pool.query(
    `
        INSERT INTO reviews (user_id, movie_id, platform_id, rating, review, created_at)
        SELECT $1, $2, $3, $4, $5, NOW()
        WHERE NOT EXISTS (
            SELECT 1 FROM reviews 
            WHERE user_id = $1 
              AND movie_id = $2 
              AND platform_id = $3
        )
        RETURNING *;
    `, [data.userId, data.peliculaId, data.platformaId, data.calificacion, data.comentario]);

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}