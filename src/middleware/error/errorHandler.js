/**
 * Middleware global de manejo de errores.
 * Captura errores generados en cualquier parte de la aplicación y envía una respuesta JSON estandarizada.
 * Oculta la pila de llamadas (stack trace) en entornos de producción por seguridad.
 *
 * @module Middleware/errorHandler
 * @param {Object} err - Objeto del error interceptado.
 * @param {number} [err.status] - Código de estado HTTP del error (por defecto 500).
 * @param {string} [err.message] - Mensaje descriptivo del error.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función next (requerida por Express para firma de error, aunque no se use).
 * @returns {void} Envía una respuesta JSON con el estado, mensaje y stack (solo en desarrollo).
 */
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);

  res.status(err.status || 500).json({
    status: "error",
    message: err.message || "Error interno del servidor",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;