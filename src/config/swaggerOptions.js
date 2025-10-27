

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
                url:'http://localhost:8003'
            }
        ]
    },
    apis:['../router/*.js']
}

export default swaggerOptions