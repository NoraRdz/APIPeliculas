import express from "express";
const router = express();

import postPeliculas from "../controllers/peliculas/postPeliculas.js";



router.post('/',postPeliculas)

export default router