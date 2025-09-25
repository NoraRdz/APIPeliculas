import express from 'express'
const app =express()
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'

const PORT = process.env.PORT

import peliculas from './router/plataforma.js'



app.use(cors())
app.use(morgan('tiny'))
app.use('/plataforma', peliculas)




app.listen(PORT,()=>{
    console.log(`Server corriendo en http://localhost:${PORT}`)
})