import express from "express";
const router = express.Router()

import verGeneros from "../controllers/generos/verGeneros.js";
import agregarGeneros from "../controllers/generos/agregarGeneros.js";
import asignarGenerosPeliculas from "../controllers/generos/asignarGenerosPeliculas.js";

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

/**
 * @swagger
 * /genero/pelicula:
 *   post:
 *     summary: Asignar un género a una película
 *     tags: [Generos]
 *     description: Asocia un género existente a una película existente en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pelicula
 *               - genero
 *             properties:
 *               pelicula:
 *                 type: string
 *                 description: Título de la película a la cual se asignará el género.
 *                 example: "Titanic"
 *               genero:
 *                 type: string
 *                 description: Nombre del género que se desea asociar.
 *                 example: "Drama"
 *     responses:
 *       200:
 *         description: Género asignado correctamente a la película.
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
 *                   example: Género asignado correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     example:
 *                       movie_id: 3
 *                       genre_id: 1
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
 *                   example: Los campos 'pelicula' y 'genero' son requeridos
 *       404:
 *         description: Película o género no encontrados.
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
 *                   example: La película o el género no existen
 *       500:
 *         description: Error del servidor o relación duplicada.
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
 *                   example: Esta película ya tiene asignado ese género.
 */

router.post('/pelicula',asignarGenerosPeliculas)

export default router