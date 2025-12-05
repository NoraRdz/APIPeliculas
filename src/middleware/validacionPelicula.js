import { body, validationResult } from 'express-validator';
import customUpload from './customUpload.js'; // Importación necesaria para usar customUpload

/**
 * Reglas de validación para los datos de la película.
 * Define las restricciones para los campos 'titulo', 'estreno' y 'sinopsis'.
 */
const rules = [
  body('titulo')
    .exists().withMessage('El título es obligatorio')
    .bail()
    .isString().withMessage('El título debe ser una cadena')
    .isLength({ min: 2, max: 200 }).withMessage('El título debe tener entre 2 y 200 caracteres')
    .trim(),
  body('estreno')
    .exists().withMessage('El año de estreno es obligatorio')
    .bail()
    .isInt({ min: 1888, max: new Date().getFullYear() + 1 }).withMessage('Año de estreno inválido'),
  body('sinopsis')
    .optional({ nullable: true })
    .isString().withMessage('La sinopsis debe ser una cadena')
    .isLength({ min: 10, max: 500 }).withMessage('La sinopsis debe tener entre 10 y 500 caracteres')
];

/**
 * Middleware compuesto para validar la creación de una película.
 * * Este middleware realiza dos acciones secuenciales:
 * 1. Procesa la subida de la imagen ('archivo') utilizando `customUpload`.
 * 2. Ejecuta las validaciones de `express-validator` sobre los campos del formulario (`req.body`).
 * * Si hay errores en la subida o en la validación de datos, retorna un error y detiene el flujo.
 * Si todo es correcto, pasa el control al siguiente controlador.
 * * @module validacionPelicula
 * @namespace Middleware
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @param {Function} next - Función para pasar al siguiente middleware/controlador.
 * @returns {void} Llama a `next()` si es exitoso o responde con JSON 400/500 si hay errores.
 */
export default function validacionPelicula(req, res, next) {
  // Inicializa el middleware de subida para un solo archivo llamado 'archivo'
  const uploader = customUpload.single('archivo');

  // Ejecuta el uploader manualmente dentro del middleware
  uploader(req, res, async (err) => {
    // Si ocurre un error en Multer (ej. archivo muy grande), pasa el error a Express
    if (err) return next(err);

    try {
      // Ejecutar reglas de express-validator manualmente
      // Esto es necesario porque el body no está disponible hasta que Multer procesa el form-data
      await Promise.all(rules.map(rule => rule.run(req)));

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Si no hay errores, continuar
      return next();
    } catch (e) {
      return next(e);
    }
  });
}