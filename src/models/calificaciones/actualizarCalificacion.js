/**
 * Actualiza la calificación de una película realizada por un usuario.
 *
 * Esta función permite modificar la calificación, el comentario y la plataforma
 * donde el usuario registró la película. Solo actualiza los campos enviados:
 * si un valor no está presente, se conserva su valor anterior gracias a `COALESCE`.
 *
 * @module Models/calificaciones/actualizarCalificacion

 *
 * @function
 * @async
 *
 * @param {Object} data - Datos necesarios para actualizar la calificación.
 * @param {number|null} [data.calificacion] - Nueva calificación del usuario (opcional).
 * @param {string|null} [data.comentario] - Nuevo comentario o reseña (opcional).
 * @param {number|null} [data.plataforma_id] - ID de la plataforma donde se vio la película (opcional).
 * @param {number} data.usuarioId - ID del usuario que realizó la calificación.
 * @param {number} data.peliculaId - ID de la película calificada.
 *
 * @returns {Promise<Object[]>} Retorna un arreglo con el registro actualizado:
 * - {number} id — ID del registro de calificación.
 * - {number} user_id — ID del usuario.
 * - {number} movie_id — ID de la película.
 * - {number} rating — Nueva calificación.
 * - {string|null} review — Comentario actualizado.
 * - {number} platform_id — ID de la plataforma.
 * - {string} created_at — Nueva fecha de actualización.
 *
 * @throws {string} "Error en el servidor" Si ocurre un problema en la consulta.
 */
export default async function actualizarCalificacion(data) {
  try {
    const result = await pool.query(
      `
      UPDATE rating
      SET 
          rating = COALESCE($1, rating),
          review = COALESCE($2, review),
          platform_id = COALESCE($3, platform_id),
          created_at = NOW()
      WHERE user_id = $4 AND movie_id = $5
      RETURNING *;
      `,
      [
        data.calificacion || null,
        data.comentario || null,
        data.plataforma_id || null,
        data.usuarioId,
        data.peliculaId
      ]
    );

    console.table(result.rows);
    return result.rows;

  } catch (err) {
    console.error(err);
    throw "Error en el servidor";
  }
}
