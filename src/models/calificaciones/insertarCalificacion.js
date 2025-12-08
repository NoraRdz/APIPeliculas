import {pool} from "../../config/postgre.js";

/**
 * @module Models/calificaciones/InsertarCalificacion
 * @description Registra una nueva calificación para una película en una plataforma específica.
 * Inserta un nuevo registro en la tabla `rating`.
 */

/**
 * Inserta una calificación para una película en una plataforma, hecha por un usuario.
 *
 * @async
 * @function InsertarCalificacion
 *
 * @param {Object} data - Datos de la calificación.
 * @param {number} data.usuarioId - ID del usuario.
 * @param {number} data.peliculaId - ID de la película.
 * @param {number} data.plataformaId - ID de la plataforma.
 * @param {number} data.calificacion - Puntuación asignada (1-5).
 * @param {string} data.comentario - Reseña o comentario del usuario.
 *
 * @returns {Promise<Object[]|Object>} Registro insertado o un objeto con error.
 *
 * @throws {string} "Error en el servidor" si ocurre un error inesperado.
 */
export default async function insertarCalificacion(data) {
  try {
    const { usuarioId, peliculaId, plataformaId, calificacion, comentario } = data;

    const result = await pool.query(
      `
        INSERT INTO rating (user_id, movie_id, platform_id, rating, review, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
        RETURNING *;
      `,
      [usuarioId, peliculaId, plataformaId, calificacion, comentario]
    );

    return result.rows;

  } catch (err) {
    console.error("Error al insertar calificación:", err);

    if (err.code === "23505") {
      return {
        success: false,
        message: "Ya existe una calificación de este usuario para esta película en esta plataforma."
      };
    }

    throw "Error en el servidor";
  }
}
