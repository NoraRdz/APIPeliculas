import {pool} from "../../config/postgre.js";

/**
 * @module Models/calificaciones/eliminarCalificacion
 * @description Elimina una calificación existente en la base de datos según
 * el usuario, la película y la plataforma.
 */

/**
 * Elimina una calificación de la tabla `rating`.
 *
 * Se ejecuta un DELETE con los identificadores proporcionados.
 *
 * @async
 * @function eliminarCalificacion
 * 
 * @param {Object} data - Identificadores para localizar la calificación.
 * @param {number} data.usuarioId - ID del usuario.
 * @param {number} data.peliculaId - ID de la película.
 * @param {number} data.plataformaId - ID de la plataforma.
 *
 * @returns {Promise<{rowCount:number, rows:Object[]}>} Resultado de la operación.
 *
 * @throws {string} "Error en el servidor" si ocurre un fallo en la consulta.
 */
export default async function eliminarCalificacion(data) {
  try {
    const { usuarioId, peliculaId, plataformaId } = data;

    const result = await pool.query(
      `
        DELETE FROM rating
        WHERE user_id = $1
        AND movie_id = $2
        AND platform_id = $3
        RETURNING *;
      `,
      [usuarioId, peliculaId, plataformaId]
    );

    return {
      rowCount: result.rowCount,
      rows: result.rows
    };
  } catch (err) {
    console.error("Error al eliminar calificación:", err);
    throw "Error en el servidor";
  }
}
