import express from "express";
const router = express.Router()

import verGeneros from "../controllers/generos/verGeneros.js";

/**
 * @swagger
 * tags:
 *   name: Generos
 *   description: Endpoints para gestionar géneros de películas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Genero:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: "Ciencia ficción"
 *     GeneroList:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/Genero'
 */

/**
 * @swagger
 * /genero:
 *   get:
 *     summary: Obtiene la lista de géneros disponibles
 *     tags: [Generos]
 *     responses:
 *       200:
 *         description: Lista de géneros
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GeneroList'
 *             examples:
 *               ejemplo:
 *                 summary: Respuesta de ejemplo
 *                 value:
 *                   - id: 1
 *                     nombre: "Ciencia ficción"
 *                   - id: 2
 *                     nombre: "Acción"
 */
router.get('/',verGeneros)


export default router