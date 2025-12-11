import { pool } from "../../config/postgre.js";

/**
 * @module Models/peliculas/insertarCalificacionEnPelicula
 * @description Inserta una nueva calificación y reseña hecha por un usuario
 * para una película en una plataforma específica. Agrega un registro a la tabla `rating`.
 */

/**
 * Inserta una calificación para una película en una plataforma.
 *
 * @async
 * @function insertarCalificacionEnPelicula
 *
 * @param {string} usuario - Nombre de usuario que realiza la calificación.
 * @param {string} pelicula - Título de la película a calificar.
 * @param {string} plataforma - Nombre de la plataforma donde se registra la calificación.
 * @param {number} calificacion - Valor numérico de la calificación.
 * @param {string} review - Texto opcional con la reseña del usuario.
 *
 * @returns {Promise<Object[]|Object>} Retorna el registro insertado en caso de éxito,
 * o un objeto con información del error si ocurre un conflicto.
 *
 * @throws {string} Lanza "Error en el servidor" si ocurre un error inesperado.
 */
export default async function insertarCalificacionEnPelicula(
  usuario,
  pelicula,
  plataforma,
  calificacion,
  review
) {
  try {
    const result = await pool.query(
      `
        INSERT INTO rating (user_id, movie_id, platform_id, rating, review)
        VALUES
        (
            (SELECT id FROM users WHERE username = $1),
            (SELECT id FROM movies WHERE title = $2),
            (SELECT id FROM platforms WHERE p_name = $3),
            $4,
            $5
        )
        RETURNING *;
      `,
      [usuario, pelicula, plataforma, calificacion, review]
    );

    return result.rows;

  } catch (err) {
    console.error("Error al insertar calificación:", err);

    if (err.code === "23505") {
      return {
        success: false,
        message: "El usuario ya calificó esta película en esta plataforma."
      };
    }

    throw "Error en el servidor";
  }
}
