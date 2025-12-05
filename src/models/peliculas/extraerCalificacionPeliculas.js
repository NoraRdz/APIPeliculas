/**
 * Módulo para extraer calificaciones.
 * @module extraerCalificacionPeliculas
 * @namespace Models
 * 
 */
import pool from '../../config/postgre.js'

/**
 * Obtiene la lista de películas junto con su calificación promedio
 * y el total de reseñas registradas.
 *
 * Esta función consulta la base de datos para obtener todas las películas
 * y sus respectivas calificaciones, calculando el promedio de rating y el
 * número total de reseñas por película.  
 * Si una película no tiene calificaciones, el promedio será `null`
 * y el total de reseñas será `0`.
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos que contienen:
 *  - {number} id — ID de la película.
 *  - {string} title — Título de la película.
 *  - {number|null} promedio_rating — Calificación promedio de la película.
 *  - {number} total_reviews — Número total de reseñas.
 *
 * En caso de error, retorna un mensaje de texto indicando que ocurrió un problema.
 */
export default async function extraerCalificacionPeliculas() {


  try {
    const result = await pool.query(
        `SELECT 
            m.id,
            m.title,
            AVG(r.rating) AS promedio_rating,
            COUNT(r.rating) AS total_reviews
        FROM movies AS m
        LEFT JOIN rating AS r ON r.movie_id = m.id
        GROUP BY m.id, m.title`
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}
