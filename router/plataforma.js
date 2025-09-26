import express from "express"
const router = express.Router()

import getPlataformas from "../controllers/plataforma/getPlataformas.js"


router.get('/', getPlataformas)


export default router

