/**
 * Módulo para obtener películas filtradas por género.
 * @module Models/peliculas/extraerPeliculasGeneros
 */

import {pool} from '../../config/postgre.js'

/**
 * Obtiene todas las películas asociadas a un género específico.
 *
 * La función consulta la base de datos uniendo las tablas `movies`, `genre`
 * y la tabla intermedia `movie_genre`, de modo que pueda devolver únicamente
 * aquellas películas que correspondan al nombre del género solicitado.
 *
 * @async
 * @function extraerPeliculasGeneros
 * @param {string} name - Nombre del género a filtrar (por ejemplo: "Terror", "Comedia").
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con:
 *   - {string} title — Título de la película.
 *   - {string} nombre — Nombre del género.
 *
 * Si ocurre algún error durante la consulta, se devuelve el texto `"Error en el servidor"`.
 */
export default async function extraerPeliculasGeneros(name) {

  try {
    const result = await pool.query(
      `SELECT 
          m.title, 
          g.nombre
       FROM movie_genre AS mg
       LEFT JOIN movies AS m ON m.id = mg.movie_id
       LEFT JOIN genre AS g ON g.id = mg.genre_id
       WHERE g.nombre = $1`,
      [name]
    );

    return result.rows;

  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
