const PORT = process.env.PORT || 8003

const swaggerOptions = {
    definition:{
        openapi:'3.0.0',
        info:{
            title:'API peliculas en plataformas',
            version: '1.0.0',
            description:'API para revisar la disponibilidad de peliculas en las plataformas',
         },
        servers: [
            {
                url:'http://localhost:PORT'.replace('PORT', PORT),
                description: 'Servidor local'
            }
        ]
    },
    // Cambiado para apuntar a los archivos reales dentro de src/router
    apis:['./src/router/*.js']
}
 
export default swaggerOptions