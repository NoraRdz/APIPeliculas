/**
 * Módulo para obtener estadísticas de cantidad de películas por género.
 * @module extraerPeliculasPorGeneros
 * @namespace Models
 */

import pool from '../../config/postgre.js'


/**
 * Calcula el número total de películas registradas por cada género.
 *
 * Esta función agrupa las películas según su género y realiza un conteo.
 * Los resultados se devuelven ordenados de forma descendente, mostrando primero
 * los géneros que tienen más películas en el catálogo.
 *
 * @alias module:extraerPeliculasPorGeneros
 * @function
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con la estadística:
 * - {string} genero — Nombre del género (ej. "Terror", "Comedia").
 * - {number|string} total_peliculas — Cantidad total de películas asociadas a ese género.
 *
 * En caso de error en la consulta, retorna el mensaje "Error en el servidor".
 */
export default async function extraerPeliculasPorGeneros() {

  try {
    const result = await pool.query(
        `SELECT 
            g.nombre AS genero,
            COUNT(mg.movie_id) AS total_peliculas
        FROM genre AS g
        LEFT JOIN movie_genre AS mg ON mg.genre_id = g.id
        GROUP BY g.nombre
        ORDER BY total_peliculas DESC;`
    );

    // console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}