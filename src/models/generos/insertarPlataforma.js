import {pool} from "../../config/postgre.js";

/**
 * @module Models/plataformas/insertarPlataforma
 * @description Inserta una nueva plataforma en la tabla `platforms`.
 */

/**
 * Inserta una plataforma en la base de datos.
 *
 * @async
 * @function insertarPlataforma
 *
 * @param {string} plataforma - Nombre de la plataforma a registrar.
 *
 * @returns {Promise<Object[]|Object>} 
 * Devuelve el registro insertado o un objeto con información del error.
 *
 * @throws {string} "Error en el servidor" si ocurre un error inesperado.
 */
export default async function insertarPlataforma(plataforma) {
  try {

    const result = await pool.query(
      `
        INSERT INTO platforms (p_name) 
        VALUES ($1)
        RETURNING *;
      `,
      [plataforma]
    );

    return result.rows;

  } catch (err) {
    console.error("Error al insertar plataforma:", err);

    if (err.code === "23505") {
      return {
        success: false,
        message: "Ya existe una plataforma con ese nombre."
      };
    }

    throw "Error en el servidor";
  }
}
