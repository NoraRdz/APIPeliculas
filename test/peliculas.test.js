import request from 'supertest';
const url = "http://localhost:3000";

describe("Pruebas de la API de Películas", () => {

    // 1. Faltaba el bloque 'it' (o 'test')
    it('debería obtener la lista de películas correctamente', async () => {
        
        // 2. Usamos async/await en lugar de .end()
        const response = await request(url).get('/pelicula');
        
        // 3. Hacemos aserciones reales (expect)
        expect(response.status).toBe(200); 
        // expect(response.body).toHaveProperty('titulo'); // Ejemplo opcional
    });

});