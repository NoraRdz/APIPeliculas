import pool from '../../config/postgre.js';

/**
 * @module Models/peliculas/agregarPeliculas
 * @description Modelo encargado de insertar nuevas películas en la base de datos.
 */

/**
 * Inserta una nueva película en la tabla `movies`.
 *
 * @async
 * @function agregarPeliculas
 *
 * @param {string} titulo - Título de la película.
 * @param {string|number} estreno - Año de estreno de la película.
 * @param {string} sinopsis - Descripción o sinopsis de la película.
 *
 * @returns {Promise<object>} Objeto con la información de la película insertada.
 *
 * @throws {string} "Error en el servidor" Si ocurre un error durante la consulta.
 *
 * @author
 * Nora Adriana Rodríguez López
 */
export default async function agregarPeliculas(titulo, estreno, sinopsis) {
  try {
    const query = `
      INSERT INTO movies (title, release_year, sinopsis)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const result = await pool.query(query, [titulo, estreno, sinopsis]);
    return result.rows[0];

  } catch (err) {
    console.error("Error al agregar película:", err);
    throw "Error en el servidor";
  }
}
