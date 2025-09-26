import express from 'express'
const app =express()
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

const PORT = process.env.PORT

import plataforma from './router/plataforma.js'
import peliculas from './router/peliculas.js'

app.use(express.json());
app.use(cors())
app.use(morgan('tiny'))
app.use('/plataforma', plataforma)
app.use('/pelicula',peliculas)




app.listen(PORT,()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})