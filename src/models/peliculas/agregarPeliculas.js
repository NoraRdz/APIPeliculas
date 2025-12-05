/**
 * Modelo de acceso a datos para Películas.
 * Aquí se definen las consultas a la base de datos relacionadas con la tabla 'movies'.
 * @module agregarPeliculas
 * @namespace Models
 * 
 */

import pool from '../../config/postgre.js'

/**
 * Inserta una nueva película en la base de datos.
 *
 * Esta función registra una película en la tabla `movies` utilizando los valores
 * proporcionados para título, año de estreno y sinopsis.  
 * Devuelve el registro insertado si la operación es exitosa.
 *
 * @author Nora Adriana Rodríguez López
 *
 * @param {string} titulo - Título de la película.
 * @param {string|number} estreno - Año de estreno de la película.
 * @param {string} sinopsis - Descripción o sinopsis de la película.
 *
 * @returns {Promise<object|string>} Un objeto con la información de la película insertada,
 * o un mensaje de error en caso de fallo.
 */
export default async function agregarPeliculas(titulo,estreno,sinopsis) {

  try {
    const result = await pool.query(
     `INSERT INTO movies(title,release_year,sinopsis)
      VALUES($1, $2, $3)
        RETURNING *;`,
        [titulo, estreno ,sinopsis]
    );

    console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return {error:true,message:"Error en el servidor"};
  }
}