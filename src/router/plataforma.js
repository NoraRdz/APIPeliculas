import express from "express"
const router = express.Router()

import getPlataformas from "../controllers/plataforma/obtenerPlataformas.js"


/**
 * @swagger
 * tags:
 *   name: Plataformas
 *   description: Endpoints para gestionar las plataformas disponibles
 */

/**
 * @swagger
 * /plataforma:
 *   get:
 *     summary: Obtiene la lista de todas las plataformas (y sus películas)
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
 *                   titulo:
 *                     type: string
 *                     example: Interstellar
 *                   plataforma:
 *                     type: string
 *                     example: Netflix
 */

router.get('/', getPlataformas)


export default router

