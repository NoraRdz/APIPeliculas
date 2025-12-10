import express from "express"
const router = express.Router()

import getPlataformas from "../controllers/plataforma/obtenerPlataformas.js"
import agregarPlataformas from "../controllers/plataforma/agregarPlataformas.js"


/**
 * @swagger
 * tags:
 *   name: Plataformas
 *   description: Endpoints para gestionar plataformas
 */

/**
 * @swagger
 * /plataforma:
 *   get:
 *     summary: Obtiene la lista de todas las plataformas
 *     tags: [Plataformas]
 *     responses:
 *       200:
 *         description: Lista obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   p_name:
 *                     type: string
 *                     example: Netflix
 *                   movies:
 *                     type: array
 *                     description: Películas asociadas a la plataforma
 *                     items:
 *                       type: object
 *                       properties:
 *                         movie_id:
 *                           type: integer
 *                           example: 10
 *                         title:
 *                           type: string
 *                           example: Interstellar
 */
router.get('/', getPlataformas)



/**
 * @swagger
 * /plataforma:
 *   post:
 *     summary: Registra una nueva plataforma
 *     tags: [Plataformas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plataforma
 *             properties:
 *               plataforma:
 *                 type: string
 *                 example: HBO Max
 *     responses:
 *       200:
 *         description: Plataforma registrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Plataforma registrada correctamente
 *                 data:
 *                   type: object
 *       400:
 *         description: Datos incompletos o incorrectos
 *       500:
 *         description: Error en el servidor
 */

router.post('/', agregarPlataformas)



export default router

