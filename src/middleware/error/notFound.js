/**
 * Middleware para manejar rutas no encontradas (404).
 * Se ejecuta cuando una solicitud entrante no coincide con ninguna ruta definida en la aplicación.
 * Crea un objeto Error con un mensaje descriptivo y establece el estado HTTP a 404.
 *
 * @module Middleware/notFound
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {string} req.originalUrl - La URL original solicitada por el cliente.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar el control al siguiente middleware (el manejador de errores).
 * @returns {void} Llama a `next` con el error generado.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

export default notFound;