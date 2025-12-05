import pool from "../../config/postgre.js";

/**
 * Elimina una calificación de la base de datos.
 *
 * @module eliminarCalificacion
 * @namespace Models
 * * @param {Object} data - Identificadores para localizar la calificación.
 * @param {number} data.user_id - ID del usuario.
 * @param {number} data.movie_id - ID de la película.
 * @param {number} data.platform_id - ID de la plataforma.
 * * @returns {Promise<Array<Object>|string>} Retorna información sobre la operación realizada.
 */
export default async function eliminarCalificacion(data) {

  try {
    // Nota: Asegúrate que la tabla se llame 'rating' o 'reviews' consistentemente en tu DB.
    // En insertar usas 'reviews', aquí 'rating'. Verifica esto en tu SQL.
    const result = await pool.query(
   `
    delete from rating where user_id = $1 
      AND movie_id = $2 
      AND platform_id = $3
    `,
    [
        data.user_id, data.movie_id,data.platform_id 
    ]);

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}