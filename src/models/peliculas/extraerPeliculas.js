/**
 * Módulo para obtener el catálogo completo de películas con toda su información asociada.
 * @module Models/peliculas/extraerPeliculas
 */

import pool from '../../config/postgre.js'

/**
 * Obtiene todas las películas registradas junto con sus géneros, plataformas,
 * promedio de calificaciones y total de reseñas.
 *
 * La consulta realiza múltiples `LEFT JOIN` para combinar películas con géneros,
 * plataformas y calificaciones. También calcula el promedio de rating (promedio_rating)
 * redondeado a un decimal y el número total de reseñas únicas (total_reviews).
 *
 * @async
 * @function extraerPeliculas
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos con los campos:
 *
 * @property {number} id — Identificador único de la película.
 * @property {string} title — Título de la película.
 * @property {string|null} genres — Géneros separados por comas (o `null` si no tiene).
 * @property {string|null} platforms — Plataformas separadas por comas (o `null` si no tiene).
 * @property {number|null} promedio_rating — Promedio de calificaciones (puede ser `null`).
 * @property {number} total_reviews — Total de reseñas registradas para la película.
 *
 * En caso de error, la función devuelve el mensaje `"Error en el servidor"`.
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
      LEFT JOIN platform_movie AS pm ON pm.movie_id = m.id
      LEFT JOIN platforms AS p ON pm.platform_id = p.id
      GROUP BY m.id, m.title
      ORDER BY promedio_rating DESC NULLS LAST`
    );

    return result.rows;

  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
