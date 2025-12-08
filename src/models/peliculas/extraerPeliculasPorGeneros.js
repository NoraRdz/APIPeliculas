/**
 * Módulo para obtener estadísticas de la cantidad de películas por género.
 * @module Models/peliculas/extraerPeliculasPorGeneros
 */

import {pool} from '../../config/postgre.js'

/**
 * Recupera la cantidad total de películas asociadas a cada género.
 *
 * Esta función consulta la base de datos para contar cuántas películas
 * están relacionadas con cada género dentro del catálogo.  
 * Utiliza una unión entre las tablas `genre` y `movie_genre` y agrupa los resultados
 * por nombre del género.
 *
 * Los géneros se devuelven ordenados de forma descendente según la cantidad de películas.
 *
 * @alias module:extraerPeliculasPorGeneros
 * @function
 *
 * @returns {Promise<Array<Object>|string>} Un arreglo de objetos con el resumen por género:
 * - {string} genero — Nombre del género (ej. "Acción", "Comedia").
 * - {number} total_peliculas — Número total de películas registradas en ese género.
 *
 * Si ocurre un error en la consulta, se retorna el mensaje `"Error en el servidor"`.
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

    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
