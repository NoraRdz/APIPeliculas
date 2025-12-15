import {pool} from "../../config/postgre.js";

/**
 * Actualiza la información de un usuario existente.
 * Utiliza COALESCE en SQL para mantener los valores actuales si los nuevos son nulos.
 *
 * @module Models/usuarios/extraerUsuarios
 *
 * @param {Object} usuario - Objeto con los datos a actualizar.
 * @param {number} usuario.id - ID del usuario a modificar.
 * @param {string} [usuario.email] - Nuevo correo electrónico (opcional).
 * @param {string} [usuario.password] - Nueva contraseña (opcional).
 *
 * @returns {Promise<Array<Object>|string>} Retorna el registro actualizado.
 * Si ocurre un error, retorna "Error en el servidor".
 */
export default async function extraerUsuarios() {
  try {
    const result = await pool.query(
      `
        select * from users
      `
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw "Error en el servidor";
  }
}
