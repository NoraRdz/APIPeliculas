import express from "express"
const router = express.Router()

import getPlataformas from "../controllers/plataforma/obtenerPlataformas.js"
import agregarPlataformas from "../controllers/plataforma/agregarPlataformas.js"
import asignarPeliculaPlataforma from "../controllers/plataforma/asignarPeliculaPlataforma.js"


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
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/plataforma")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           response = requests.get("https://apipeliculas-production-a074.up.railway.app/plataforma")
 *           print(response.json())
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
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/plataforma", {
 *             method: "POST",
 *             headers: {
 *               "Content-Type": "application/json"
 *             },
 *             body: JSON.stringify({
 *               plataforma: "HBO Max"
 *             })
 *           })
 *           .then(res => res.json())
 *           .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           payload = {
 *               "plataforma": "HBO Max"
 *           }
 *
 *           response = requests.post(
 *               "https://apipeliculas-production-a074.up.railway.app/plataforma",
 *               json=payload
 *           )
 *
 *           print(response.json())
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


/**
 * @swagger
 * /plataforma/pelicula:
 *   post:
 *     summary: Asigna una película a una plataforma
 *     tags: [Plataformas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pelicula
 *               - plataforma
 *               - publicacion
 *             properties:
 *               pelicula:
 *                 type: string
 *                 description: Título de la película
 *                 example: Inception
 *               plataforma:
 *                 type: string
 *                 description: Nombre de la plataforma
 *                 example: Netflix
 *               publicacion:
 *                 type: string
 *                 description: Fecha o información de disponibilidad
 *                 example: "2023-05-10"
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/plataforma/pelicula", {
 *             method: "POST",
 *             headers: {
 *               "Content-Type": "application/json"
 *             },
 *             body: JSON.stringify({
 *               pelicula: "Inception",
 *               plataforma: "Netflix",
 *               publicacion: "2023-05-10"
 *             })
 *           })
 *           .then(res => res.json())
 *           .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           payload = {
 *               "pelicula": "Inception",
 *               "plataforma": "Netflix",
 *               "publicacion": "2023-05-10"
 *           }
 *
 *           response = requests.post(
 *               "https://apipeliculas-production-a074.up.railway.app/plataforma/pelicula",
 *               json=payload
 *           )
 *
 *           print(response.json())
 *     responses:
 *       200:
 *         description: Película asignada correctamente a la plataforma
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
 *                   example: Película asignada a plataforma correctamente
 *                 data:
 *                   type: object
 *       400:
 *         description: Datos incompletos o incorrectos
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
 *                   example: "Los campos 'pelicula', 'plataforma' y 'publicacion' son requeridos"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *                   example: Error al asignar película a plataforma
 */

router.post('/pelicula', asignarPeliculaPlataforma)


export default router

