import express from "express"
const router = express.Router()

import getPlataformas from "../controllers/plataforma/getPlataformas.js"


/**
 * @swagger
 * tags:
 *   name: Películas
 *   description: Endpoints para gestionar las plataformas disponibles
 */

/**
 * @swagger
 * /plataforma:
 *   get:
 *     summary: Obtiene la lista de todas las películas
 *     tags: [Películas]
 *     responses:
 *       200:
 *         description: Lista de películas obtenida correctamente
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

