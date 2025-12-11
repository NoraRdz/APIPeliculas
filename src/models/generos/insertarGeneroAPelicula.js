import {pool} from "../../config/postgre.js";

/**
 * @module Models/generos/insertarGeneroAPelicula
 * @description Asocia un género existente a una película existente.
 * Inserta un nuevo registro en la tabla `movie_genre`.
 */

/**
 * Inserta una relación entre una película y un género.
 *
 * @async
 * @function insertarGeneroAPelicula
 *
 * @param {string} pelicula - Título de la película a la que se desea agregar el género.
 * @param {string} genero - Nombre del género a asociar a la película.
 *
 * @returns {Promise<Object[]|Object>} El registro insertado o un objeto con un mensaje de error.
 *
 * @throws {string} "Error en el servidor" si ocurre un error inesperado.
 */
export default async function insertarGeneroAPelicula(pelicula, genero) {
  console.log(pelicula,genero)
  try {
    const result = await pool.query(
      `
        INSERT INTO movie_genre (movie_id, genre_id)
        VALUES 
        (
            (SELECT id FROM movies WHERE title = $1),
            (SELECT id FROM genre WHERE nombre = $2)
        )
        RETURNING *;
      `,
      [pelicula, genero]
    );

    return result.rows;

  } catch (err) {
    console.error("Error al insertar género:", err);

    if (err.code === "23505") {
      throw{
        success: false,
        message: "Esta película ya tiene asignado ese género."
      };
    }

    throw "Error en el servidor";
  }
}
