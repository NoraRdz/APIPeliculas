import express from 'express';
const router = express.Router()
import verCalificacionesUsuario from '../controllers/usuarios/calificaciones/verCalificacionesUsuario.js'
import agregarCalificacion from '../controllers/usuarios/calificaciones/agregarCalificacion.js'
import modificarCalificacion from '../controllers/usuarios/calificaciones/modificarCalificacion.js'
import modificarParteCalificacion from '../controllers/usuarios/calificaciones/modificarParteCalificacion.js'
import quitarCalificacion from '../controllers/usuarios/calificaciones/quitarCalificacion.js'


/**
 * @swagger
 * tags:
 *   - name: Calificaciones
 *     description: Gestión de reviews y ratings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CalificacionOutput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título de la película
 *         rating:
 *           type: number
 *         p_name:
 *           type: string
 *           description: Plataforma
 *
 *     CalificacionInput:
 *       type: object
 *       required:
 *         - userId
 *         - peliculaId
 *         - plataformaId
 *         - calificacion
 *       properties:
 *         userId:
 *           type: integer
 *         peliculaId:
 *           type: integer
 *         plataformaId:
 *           type: integer
 *         calificacion:
 *           type: number
 *         comentario:
 *           type: string
 */


/**
 * @swagger
 * /usuario/calificacion/{id}:
 *   get:
 *     summary: Ver historial de calificaciones de un usuario
 *     tags: [Calificaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Historial recuperado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CalificacionOutput'
 */
router.get('/:id', verCalificacionesUsuario);

/**
 * @swagger
 * /usuario/calificacion:
 *   post:
 *     summary: Agregar nueva calificación
 *     tags: [Calificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CalificacionInput'
 *     responses:
 *       201:
 *         description: Calificación creada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Calificación agregada
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 15
 *                     user_id:
 *                       type: integer
 *                       example: 1
 *                     movie_id:
 *                       type: integer
 *                       example: 1
 *                     platform_id:
 *                       type: integer
 *                       example: 1
 *                     rating:
 *                       type: number
 *                       example: 4
 *                     review:
 *                       type: string
 *                       example: Buena peli
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-01-01T12:00:00Z
 * 
 *       400:
 *         description: Error en los datos enviados (por ejemplo, calificación duplicada)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Ya existe una calificación para esta película en esta plataforma.
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error en el servidor
 */
router.post('/', agregarCalificacion);

/**
 * @swagger
 * /usuario/calificacion:
 *   put:
 *     summary: Modificar calificación existente
 *     tags: [Calificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - movieId
 *               - platform_id
 *             properties:
 *               userId:
 *                 type: integer
 *               movieId:
 *                 type: integer
 *               platform_id:
 *                 type: integer
 *               rating:
 *                 type: number
 *               review:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actualizado correctamente
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error en el servidor
 */
router.put('/', modificarCalificacion);


/**
 * @swagger
 * /calificaciones:
 *   patch:
 *     tags:
 *       - Calificaciones
 *     summary: Modifica parcialmente una calificación existente.
 *     description: Permite actualizar el rating, comentario o plataforma de una calificación. Solo se deben enviar los campos que se desean modificar.
 *     operationId: modificarParteCalificacion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - peliculaId
 *             properties:
 *               usuarioId:
 *                 type: integer
 *                 description: ID del usuario que realizó la calificación.
 *                 example: 101
 *               peliculaId:
 *                 type: integer
 *                 description: ID de la película calificada.
 *                 example: 25
 *               calificacion:
 *                 type: number
 *                 format: double
 *                 description: Nueva calificación (rating) a asignar. Opcional.
 *                 example: 4.5
 *               comentario:
 *                 type: string
 *                 description: Nuevo comentario o reseña de la película. Opcional.
 *                 example: "Excelente trama y desarrollo de personajes."
 *               plataformaId:
 *                 type: integer
 *                 description: Nuevo ID de la plataforma donde se vio la película. Opcional.
 *                 example: 3
 *     responses:
 *       '200':
 *         description: Calificación actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Calificación actualizada correctamente"
 *                 data:
 *                    type: object
 *                    properties:
 *                      usuarioId:
 *                        type: integer
 *                      peliculaId:
 *                        type: integer
 *                      calificacion:
 *                        type: number
 *                      comentario:
 *                        type: string
 *                      plataformaId:
 *                        type: integer
 *
 *       '400':
 *         description: Solicitud inválida (ej. faltan IDs requeridos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Datos incompletos. Se requieren 'usuarioId' y 'peliculaId'."
 *       '404':
 *         description: Calificación no encontrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontró la calificación para el usuario y película especificados."
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error interno del servidor."
 */

router.patch('/', modificarParteCalificacion);



/**
 * @swagger
 * /usuario/calificacion:
 *   delete:
 *     summary: Eliminar una calificación
 *     tags: [Calificaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - movie_id
 *               - platform_id
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: 1
 *               movie_id:
 *                 type: integer
 *                 example: 1
 *               platform_id:
 *                 type: integer
 *                 example: 1
 * 
 *     responses:
 *       200:
 *         description: Calificación eliminada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Calificación eliminada
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 10
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       movie_id:
 *                         type: integer
 *                         example: 1
 *                       platform_id:
 *                         type: integer
 *                         example: 1
 *                       rating:
 *                         type: number
 *                         example: 4
 *                       review:
 *                         type: string
 *                         example: Buena peli
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-01-07T15:30:00.000Z
 *
 *       404:
 *         description: No se encontró la calificación para eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Calificación no encontrada
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hubo un error
 */
router.delete('/', quitarCalificacion);


export default router