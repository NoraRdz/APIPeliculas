import express from 'express';
const router = express.Router()

import verUsuarios from '../controllers/usuarios/verUsuarios.js'


router.get('/', verUsuarios)

export default router
