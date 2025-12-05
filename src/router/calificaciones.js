import express from 'express';
const router = express.Router()
import verCalificacionesUsuario from '../controllers/usuarios/calificaciones/verCalificacionesUsuario.js'
import agregarCalificacion from '../controllers/usuarios/calificaciones/agregarCalificacion.js'
import modificarCalificacion from '../controllers/usuarios/calificaciones/modificarCalificacion.js'
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
 *       200:
 *         description: Calificación guardada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     rating:
 *                       type: number
 *                     review:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
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
 */
router.put('/', modificarCalificacion);



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
 *               movie_id:
 *                 type: integer
 *               platform_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Eliminado correctamente
 */
router.delete('/', quitarCalificacion);

export default router