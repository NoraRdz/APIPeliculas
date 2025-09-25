import express from "express"
const router = express.Router()

import peliculas from "../controllers/plataforma/getPlataformas.js"


router.get('/:id', peliculas.getPeliculas)


export default router

