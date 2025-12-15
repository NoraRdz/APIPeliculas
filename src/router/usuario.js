import express from 'express';
const router = express.Router();

import calificaciones from './calificaciones.js';
import verUsuarios from '../controllers/usuarios/verUsuarios.js';
import verUnUsuario from '../controllers/usuarios/verUnUsuarios.js';
import agregarUsuario from '../controllers/usuarios/agregarUsuario.js';
import modificarUsuario from '../controllers/usuarios/modificarUsuario.js';



/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios del sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Listar todos los usuarios
 *     tags: [Usuarios]
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/usuario")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           response = requests.get("https://apipeliculas-production-a074.up.railway.app/usuario")
 *           print(response.json())
 *     responses:
 *       200:
 *         description: Lista de usuarios
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
 *                     $ref: '#/components/schemas/Usuario'
 */
router.get('/', verUsuarios);


/**
 * @swagger
 * /usuario:
 *   post:
 *     summary: Registrar nuevo usuario
 *     tags: [Usuarios]
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/usuario", {
 *             method: "POST",
 *             headers: {
 *               "Content-Type": "application/json"
 *             },
 *             body: JSON.stringify({
 *               username: "nora",
 *               email: "nora@email.com",
 *               password: "123456"
 *             })
 *           })
 *           .then(res => res.json())
 *           .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           payload = {
 *               "username": "nora",
 *               "email": "nora@email.com",
 *               "password": "123456"
 *           }
 *
 *           response = requests.post(
 *               "https://apipeliculas-production-a074.up.railway.app/usuario",
 *               json=payload
 *           )
 *
 *           print(response.json())
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario registrado
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
 *                   $ref: '#/components/schemas/Usuario'
 */
router.post('/', agregarUsuario);


/**
 * @swagger
 * /usuario:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/usuario", {
 *             method: "PUT",
 *             headers: {
 *               "Content-Type": "application/json"
 *             },
 *             body: JSON.stringify({
 *               id: 1,
 *               username: "nora_actualizada",
 *               email: "nora@nuevo.com"
 *             })
 *           })
 *           .then(res => res.json())
 *           .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           payload = {
 *               "id": 1,
 *               "username": "nora_actualizada",
 *               "email": "nora@nuevo.com"
 *           }
 *
 *           response = requests.put(
 *               "https://apipeliculas-production-a074.up.railway.app/usuario",
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
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put('/', modificarUsuario);



/**
 * @swagger
 * /usuario/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     x-codeSamples:
 *       - lang: javascript
 *         source: |
 *           fetch("https://apipeliculas-production-a074.up.railway.app/usuario/1")
 *             .then(res => res.json())
 *             .then(data => console.log(data));
 *       - lang: python
 *         source: |
 *           import requests
 *
 *           response = requests.get("https://apipeliculas-production-a074.up.railway.app/usuario/1")
 *           print(response.json())
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 */
router.get('/:id', verUnUsuario);


router.use('/calificacion', calificaciones);

export default router;