import express from "express";
const router = express.Router()

import postPeliculas from "../controllers/peliculas/postPeliculas.js";



router.post('/',postPeliculas)

export default router