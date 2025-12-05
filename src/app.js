import express from 'express'
const app =express()
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from './config/swaggerOptions.js'
import redoc from 'redoc-express'

const PORT = process.env.PORT 


app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))

const especificacioneSwagger = swaggerJSDoc(swaggerOptions)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(especificacioneSwagger))

app.get('/api-docs-json',(req,res)=>{
    // devolver el JSON generado, no la función
    res.json(especificacioneSwagger)
})

app.get('/redoc', redoc({
    title: 'API Docs',
    specUrl: '/api-docs-json'
}))
//rutas

import plataformas from './router/plataforma.js'
import peliculas from './router/peliculas.js'
import usuarios from './router/usuario.js'
import generos from './router/generos.js'


app.use('/usuario',usuarios)
app.use('/plataforma', plataformas)
app.use('/pelicula',peliculas)
app.use('/genero', generos)

// middlewares

import notFound from './middleware/error/notFound.js'
import  errorHandler  from "./middleware/error/errorHandler.js";

// Registrar notFound antes del manejador de errores
app.use(notFound)
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})