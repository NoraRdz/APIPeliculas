import { createUpload } from './multer.js';

/**
 * Configuración personalizada de Multer para la subida de archivos de películas.
 * Define cómo se nombrará el archivo basado en el título de la película enviado en el body.
 *
 * @module customUpload
 * @namespace Middleware
 * * @description
 * - **Filename**: Reemplaza espacios en el título por guiones y conserva la extensión original.
 * - Si no hay título en el body, usa un comportamiento fallback (vacío o timestamp según multer.js).
 */
const customUpload = createUpload({
  filename: (req, file, cb) => {
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.')) || '';
    // Sanitiza el título para que sea seguro en URL/sistema de archivos
    const name = req.body.titulo?.replace(/\s+/g, '-') || 'sin-titulo';
    cb(null, `${name}${ext}`);
  }
});

export default customUpload;