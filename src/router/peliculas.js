import express from "express";
const router = express.Router();


import postPeliculas from "../controllers/peliculas/postPeliculas.js";
import verPeliculas from "../controllers/peliculas/verPeliculas.js";
import verPeliculasPlataforma from "../controllers/peliculas/verPeliculasPlataforma.js";
import verPeliculasGeneros from "../controllers/peliculas/verPeliculasGeneros.js";
import verCalificacionPeliculas from "../controllers/peliculas/verCalificacionPeliculas.js";
import validacionPelicula from "../middleware/validacionPelicula.js";
import customUpload from "../middleware/customUpload.js";
import agregarCalificacionPelicula from "../controllers/peliculas/agregarCalificacionPelicula.js";

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
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/pelicula")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *           response = requests.get("https://apipeliculas-production-a074.up.railway.app/pelicula")
 *           print(response.json())
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
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/pelicula/genero?name=Terror")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *           response = requests.get(
 *               "https://apipeliculas-production-a074.up.railway.app/pelicula/genero",
 *               params={"name": "Terror"}
 *           )
 *           print(response.json())
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
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/pelicula/plataforma/Netflix")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *           response = requests.get(
 *               "https://apipeliculas-production-a074.up.railway.app/pelicula/plataforma/Netflix"
 *           )
 *           print(response.json())
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
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/pelicula/calificacion?plataforma=Netflix")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *           response = requests.get(
 *               "https://apipeliculas-production-a074.up.railway.app/pelicula/calificacion",
 *               params={"plataforma": "Netflix"}
 *           )
 *           print(response.json())
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
 * /pelicula/calificacion:
 *   post:
 *     summary: Registra una nueva calificación para una película en una plataforma
 *     tags: [Peliculas]
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/pelicula/calificacion", {
 *             method: "POST",
 *             headers: { "Content-Type": "application/json" },
 *             body: JSON.stringify({
 *               usuario: "juan23",
 *               pelicula: "Inception",
 *               plataforma: "Netflix",
 *               calificacion: 4.5,
 *               review: "Muy buena película"
 *             })
 *           });
 *       - lang: python
 *         source: |
 *           import requests
 *           payload = {
 *             "usuario": "juan23",
 *             "pelicula": "Inception",
 *             "plataforma": "Netflix",
 *             "calificacion": 4.5,
 *             "review": "Muy buena película"
 *           }
 *           response = requests.post(
 *               "https://apipeliculas-production-a074.up.railway.app/pelicula/calificacion",
 *               json=payload
 *           )
 *           print(response.json())
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - pelicula
 *               - plataforma
 *               - calificacion
 *             properties:
 *               usuario:
 *                 type: string
 *                 description: Nombre del usuario que realiza la calificación
 *                 example: "juan23"
 *               pelicula:
 *                 type: string
 *                 description: Título de la película a calificar
 *                 example: "Inception"
 *               plataforma:
 *                 type: string
 *                 description: Nombre de la plataforma donde se registra la calificación
 *                 example: "Netflix"
 *               calificacion:
 *                 type: number
 *                 description: Valor numérico de la calificación (ej. 1-5)
 *                 example: 4.5
 *               review:
 *                 type: string
 *                 description: Reseña opcional del usuario
 *                 example: "Muy buena película, efectos increíbles."
 *
 *     responses:
 *       200:
 *         description: Calificación registrada correctamente
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
 *                   example: "Calificación registrada correctamente"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     user_id:
 *                       type: integer
 *                     movie_id:
 *                       type: integer
 *                     platform_id:
 *                       type: integer
 *                     rating:
 *                       type: number
 *                     review:
 *                       type: string
 *
 *       400:
 *         description: Datos incompletos enviados por el cliente
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
 *                   example: "Los campos 'usuario', 'pelicula', 'plataforma' y 'calificacion' son requeridos"
 *
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/calificacion', agregarCalificacionPelicula);

/**
 * @swagger
 * /pelicula:
 *   post:
 *     summary: Crea una nueva película (con imagen)
 *     tags: [Peliculas]
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *
 *           fetch("https://apipeliculas-production-a074.up.railway.app/pelicula", {
 *             method: "POST",
 *             headers: { "Content-Type": "application/json" },
 *             body: JSON.stringify({
 *               usuario: "juan23",
 *               pelicula: "Inception",
 *               plataforma: "Netflix",
 *               calificacion: 4.5,
 *               review: "Muy buena película"
 *             })
 *           });
 *       - lang: python
 *         source: |
 *           import requests
 *           response = requests.post(
 *               "https://apipeliculas-production-a074.up.railway.app/pelicula",
 *               files={
 *                 "titulo": "Interstellar",
 *                 "estreno": 2014,
 *                 "sinopsis": "Viaje espacial"
 *               }
 *           )
 *           print(response.json())
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
 * 
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
router.post('/', validacionPelicula, postPeliculas);


export default router