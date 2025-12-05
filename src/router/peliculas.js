import express from "express";
const router = express.Router();


import postPeliculas from "../controllers/peliculas/postPeliculas.js";
import verPeliculas from "../controllers/peliculas/verPeliculas.js";
import verPeliculasPlataforma from "../controllers/peliculas/verPeliculasPlataforma.js";
import verPeliculasGeneros from "../controllers/peliculas/verPeliculasGeneros.js";
import verCalificacionPeliculas from "../controllers/peliculas/verCalificacionPeliculas.js";
import validacionPelicula from "../middleware/validacionPelicula.js";
import customUpload from "../middleware/customUpload.js";

/**
 * @swagger
 * tags:
 *   - name: Peliculas
 *     description: Gestión del catálogo de películas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PeliculaStats:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         genres:
 *           type: string
 *           description: Lista de géneros concatenados
 *         platforms:
 *           type: string
 *           description: Lista de plataformas concatenadas
 *         promedio_rating:
 *           type: number
 *           format: float
 *         total_reviews:
 *           type: integer
 *
 *     PeliculaPlataforma:
 *       type: object
 *       properties:
 *         platform:
 *           type: string
 *         movie:
 *           type: string
 *         available_since:
 *           type: string
 *           format: date
 *
 *     RespuestaStandar:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *             type: object
 */



/**
 * @swagger
 * /pelicula:
 *   get:
 *     summary: Obtiene todas las películas con estadísticas
 *     tags: [Peliculas]
 *     responses:
 *       200:
 *         description: Catálogo completo con promedios y total de reseñas
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PeliculaStats'
 *       404:
 *         description: No hay películas registradas
 */
router.get('/',verPeliculas)

/**
 * @swagger
 * /pelicula/genero:
 *   get:
 *     summary: Filtra por género u obtiene estadísticas de géneros
 *     description: >
 *       Si se envía el parámetro `name`, devuelve las películas de ese género.  
 *       Si no, devuelve la cantidad de películas por género.
 *     tags: [Peliculas]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Nombre del género (ej. Terror)
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Puede ser {title, nombre} o {genero, total_peliculas}
 *       404:
 *         description: Género no encontrado
 */
router.get('/genero', verPeliculasGeneros);


/**
 * @swagger
 * /pelicula/plataforma/{name}:
 *   get:
 *     summary: Películas disponibles en una plataforma específica
 *     tags: [Peliculas]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Nombre de la plataforma (ej. Netflix)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de películas
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
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PeliculaPlataforma'
 */
router.get('/plataforma/:name', verPeliculasPlataforma);


/**
 * @swagger
 * /pelicula/calificacion:
 *   get:
 *     summary: Obtiene calificaciones promedio (filtro opcional por plataforma)
 *     tags: [Peliculas]
 *     parameters:
 *       - in: query
 *         name: plataforma
 *         schema:
 *           type: string
 *         description: Filtrar por nombre de plataforma
 *     responses:
 *       200:
 *         description: Estadísticas de calificación
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
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id: { type: integer }
 *                       title: { type: string }
 *                       promedio_rating: { type: number }
 *                       total_reviews: { type: integer }
 */
router.get('/calificacion', verCalificacionPeliculas);



/**
 * @swagger
 * /pelicula:
 *   post:
 *     summary: Crea una nueva película (con imagen)
 *     tags: [Peliculas]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - estreno
 *             properties:
 *               titulo:
 *                 type: string
 *               estreno:
 *                 type: integer
 *               sinopsis:
 *                 type: string
 *               archivo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Película creada
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     id: { type: integer }
 *                     title: { type: string }
 *                     release_year: { type: integer }
 *                     sinopsis: { type: string }
 *       400:
 *         description: Error de validación
 */
router.post('/', customUpload.single('archivo'), validacionPelicula, postPeliculas);

export default router