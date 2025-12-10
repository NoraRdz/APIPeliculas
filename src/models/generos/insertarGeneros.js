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
 * @param {number} genero - Nombre del genero
 *
 * @returns {Promise<Object[]|Object>} Registro insertado o un objeto con error.
 *
 * @throws {string} "Error en el servidor" si ocurre un error inesperado.
 */
export default async function insertarGeneros(genero) {
  try {

    const result = await pool.query(
      `
        insert into genre (nombre)
        values($1)
        RETURNING *;
      `,
      [genero]
    );

    return result.rows;

  } catch (err) {
    console.error("Error al insertar calificación:", err);

    if (err.code === "23505") {
      return {
        success: false,
        message: "Ya existe una genero con ese nombre."
      };
    }

    throw "Error en el servidor";
  }
}
