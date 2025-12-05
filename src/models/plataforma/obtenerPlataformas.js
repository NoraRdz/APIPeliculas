/**
 * Módulo para gestionar el catálogo de plataformas de streaming.
 * @module obtenerCatalogoPlataformas
 * @namespace Models
 */

import pool from "../../config/postgre.js"

/**
 * Obtiene la lista de plataformas registradas o una plataforma específica.
 *
 * Esta función consulta la tabla `platforms` y tiene un comportamiento dinámico:
 * 1. Si no se proporciona un `id`, devuelve el listado completo de todas las plataformas.
 * 2. Si se proporciona un `id`, devuelve únicamente la plataforma que coincida con ese identificador.
 *
 * @alias module:obtenerCatalogoPlataformas
 * @function
 *
 * @param {number|string} [id] - (Opcional) ID de la plataforma a buscar. Si se omite, se retornan todas.
 *
 * @returns {Promise<Array<Object>|string>} Retorna un arreglo de objetos que representan las plataformas.
 * Generalmente incluye campos como:
 * - {number} id - Identificador de la plataforma.
 * - {string} p_name - Nombre de la plataforma.
 *
 * En caso de error en la consulta, retorna el mensaje "Error en el servidor".
 */
export default async function obtenerCatalogoPlataformas(id) {
     console.log(id)
  let consultSql;
  if(id == undefined){
    consultSql='SELECT * FROM platforms'
  }
  else{
    consultSql=`SELECT * FROM platforms WHERE id=${id}`
  }

//   console.log(consultSql)

  try {
    const result = await pool.query(consultSql);

    console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}