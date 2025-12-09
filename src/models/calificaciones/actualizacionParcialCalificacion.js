import { pool } from "../../config/postgre.js"; 

/**
 * Modelo para el método PATCH: Actualiza parcialmente una calificación existente.
 * Utiliza COALESCE(nuevo_valor, valor_actual) para solo actualizar los campos que el usuario proporciona.
 *
 * @module Models/calificaciones/actualizarCalificacion
 * @param {Object} data - Datos necesarios para actualizar la calificación.
 * @param {number|null} [data.calificacion] - Nueva calificación (opcional).
 * @param {string|null} [data.comentario] - Nuevo comentario (opcional).
 * @param {number|null} [data.plataforma_id] - ID de la plataforma (opcional).
 * @param {number} data.usuarioId - ID del usuario (requerido).
 * @param {number} data.peliculaId - ID de la película (requerido).
 *
 * @returns {Promise<Object[]>} Retorna un arreglo con el registro actualizado.
 * @throws {string} "Error en el servidor" Si ocurre un problema en la consulta.
 */
export default async function actualizacionParcialCalificacion(data) {
    try {
        const result = await pool.query(
            `
            UPDATE rating
            SET 
                -- Si $1 no es NULL, usa $1. Si es NULL, usa el valor actual de 'rating'.
                rating = COALESCE($1, rating),
                review = COALESCE($2, review),
                platform_id = COALESCE($3, platform_id),
                created_at = NOW() -- Marca de tiempo de la actualización
            WHERE user_id = $4 AND movie_id = $5
            RETURNING *;
            `,
            [
                // ** Lógica clave para PATCH: Solo si el campo EXISTE, lo enviamos. **
                // Si el campo NO está en 'data', enviamos NULL, lo que activa COALESCE.
                data.calificacion !== undefined ? data.calificacion : null,
                data.comentario !== undefined ? data.comentario : null,
                data.plataforma_id !== undefined ? data.plataforma_id : null,
                data.usuarioId,
                data.peliculaId
            ]
        );

        return result.rows;

    } catch (err) {
        console.error("Error en la consulta de actualización parcial:", err);
        throw "Error en el servidor";
    }
}