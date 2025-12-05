/**
 * Módulo para obtener películas filtradas por género.
 * @namespace Models
 * @module extraerPeliculasGeneros
 */

import pool from '../../config/postgre.js'

/**
 * Busca y retorna las películas asociadas a un género específico.
 *
 * Esta función realiza una consulta uniendo las tablas de películas y géneros
 * (mediante la tabla intermedia `movie_genre`) para filtrar los resultados
 * basándose en el nombre del género proporcionado.
 *
 * @alias module:extraerPeliculasGeneros
 * @function
 *
 * @param {string} name - Nombre del género a buscar (ej. "Terror", "Comedia").
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con la siguiente estructura:
 * - {string} title — Título de la película.
 * - {string} nombre — Nombre del género asociado.
 *
 * Si ocurre un error en la conexión o consulta, retorna el mensaje "Error en el servidor".
 */
export default async function extraerPeliculasGeneros(name) {

  try {
    const result = await pool.query(
        `select m.title, g.nombre
            from movie_genre as mg
            left join movies as m on (m.id=mg.movie_id)
            left join genre as g on (g.id=mg.genre_id)
            where g.nombre = $1`,
            [name]
    );

    // console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}