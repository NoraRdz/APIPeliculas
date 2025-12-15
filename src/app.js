import express from 'express'
const app =express()
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerOptions from './config/swaggerOptions.js'
import redoc from 'redoc-express'
import path from 'path'
import {createTables as crearTabla} from './config/postgre.js';
const PORT = process.env.PORT 
import { fileURLToPath } from 'url';
import {cambiarValoresALower,convertValuesToLowercase} from './middleware/cambiarValoresALower.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Servir la carpeta /src/public
app.use(express.static(path.join(__dirname, 'public')));

crearTabla();


app.use(express.json());
app.use((req, res, next) => {
    if (req.body && typeof req.body === 'object') {
        req.body = convertValuesToLowercase(req.body);
    }
    next();
});
app.use(cors())
app.use(morgan('tiny'))
const docsPath = path.join(process.cwd(), 'doc');



app.use('/docs-js', express.static(docsPath));

app.get('/docs', (req, res) => {
  res.redirect('/docs-js/index.html');
});

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

app.use(cambiarValoresALower)
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


app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})