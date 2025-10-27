import express from 'express'
const app =express()
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from './config/swaggerOptions.js'

const PORT = process.env.PORT


app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))

const especificacioneSwagger = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(especificacioneSwagger))
//rutas

import plataformas from './router/plataforma.js'
import peliculas from './router/peliculas.js'
import usuarios from './router/usuario.js'


app.use('/usuario',usuarios)
app.use('/plataforma', plataformas)
app.use('/pelicula',peliculas)

// middlewares

import notFound from './middlewares/error/notFound.js'
import  errorHandler  from "./middlewares/error/errorHandler.js";


app.use(errorHandler)
app.use(notFound)


app.listen(PORT,()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})