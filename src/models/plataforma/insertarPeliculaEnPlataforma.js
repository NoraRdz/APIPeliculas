import { pool } from "../../config/postgre.js";

/**
 * @module Models/plataforma/insertarPeliculaEnPlataforma
 * @description Inserta la relación entre una plataforma y una película, 
 * registrando cuándo está disponible, en la tabla `platform_movie`.
 */

/**
 * Asigna una película a una plataforma específica.
 *
 * @async
 * @function insertarPeliculaEnPlataforma
 *
 * @param {string} pelicula - Nombre o título de la película.
 * @param {string} plataforma - Nombre de la plataforma donde estará disponible.
 * @param {string} publicacion - Fecha o información de disponibilidad.
 *
 * @returns {Promise<Object[]|Object>} El registro insertado o un objeto con un mensaje de error.
 *
 * @throws {string} Lanza "Error en el servidor" si ocurre un error inesperado.
 */
export default async function insertarPeliculaEnPlataforma(pelicula, plataforma, publicacion) {
  try {
    const result = await pool.query(
      `
        INSERT INTO platform_movie (platform_id, movie_id, available_since)
        VALUES
        (
            (SELECT id FROM platforms WHERE p_name = $1),
            (SELECT id FROM movies WHERE title = $2),
            $3
        )
        RETURNING *;
      `,
      [plataforma, pelicula, publicacion] // 👈 ORDEN CORREGIDO respecto al SQL
    );

    return result.rows;

  } catch (err) {
    console.error("Error al insertar película en plataforma:", err);

    if (err.code === "23505") {
      return {
        success: false,
        message: "Esta película ya está asignada a esta plataforma."
      };
    }

    throw "Error en el servidor";
  }
}

