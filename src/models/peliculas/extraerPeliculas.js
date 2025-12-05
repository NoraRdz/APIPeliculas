/**
 * Módulo para obtener el catálogo completo de películas.
 * @module extraerPeliculas
 * @namespace Models
 * 
 */

import pool from '../../config/postgre.js'

/**
 * Obtiene todas las películas registradas con sus estadísticas de calificación.
 *
 * Esta función recupera el listado completo de películas desde la base de datos.
 * Realiza un cálculo del promedio de rating y cuenta el total de reseñas
 * para cada título utilizando una agrupación (GROUP BY).
 *
 * @alias module:extraerPeliculas
 * @function
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos donde cada uno contiene:
 * - {number} id - Identificador único de la película.
 * - {string} title - Título de la película.
 * - {number|null} promedio_rating - Promedio de calificaciones (puede ser null si no tiene reseñas).
 * - {number} total_reviews - Cantidad total de reseñas recibidas.
 *
 * Si ocurre un error en la base de datos, retorna el mensaje "Error en el servidor".
 */
export default async function extraerPeliculas() {

  try {
    const result = await pool.query(
        `SELECT 
            m.id, 
            m.title,
            STRING_AGG(DISTINCT g.nombre, ', ') AS genres,
            STRING_AGG(DISTINCT p.p_name, ', ') AS platforms,
            ROUND(AVG(r.rating)::numeric, 1) AS promedio_rating,
            COUNT(DISTINCT r.id) AS total_reviews
        FROM movies AS m
        LEFT JOIN rating AS r ON r.movie_id = m.id
        LEFT JOIN movie_genre AS mg ON mg.movie_id = m.id
        LEFT JOIN genre AS g ON mg.genre_id = g.id
        left join platform_movie as pm on pm.movie_id=m.id
        left join platforms as p on pm.platform_id=p.id
        GROUP BY m.id, m.title
        order by promedio_rating DESC NULLS LAST;`
    );

    // console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
  
}