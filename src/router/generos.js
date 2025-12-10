import express from "express";
const router = express.Router()

import verGeneros from "../controllers/generos/verGeneros.js";
import agregarGeneros from "../controllers/generos/agregarGeneros.js";

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


/**
 * @swagger
 * /genero:
 *   post:
 *     summary: Registrar un nuevo género
 *     tags: [Generos]
 *     description: Inserta un nuevo género en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - genero
 *             properties:
 *               genero:
 *                 type: string
 *                 description: Nombre del género a registrar.
 *                 example: Acción
 *     responses:
 *       200:
 *         description: Género registrado correctamente.
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
 *                   example: Género registrado correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       id: 1
 *                       nombre: Acción
 *       400:
 *         description: Datos inválidos o faltantes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: El campo 'genero' es requerido
 *       500:
 *         description: Error del servidor o género duplicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Ya existe un género con ese nombre.
 */


router.post('/',agregarGeneros)

export default router