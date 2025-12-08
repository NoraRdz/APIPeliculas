import path from "path"
import multer from 'multer';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directorio por defecto: src/public/archives
const defaultFolder = path.join(__dirname, '..','public', 'archives');
if (!fs.existsSync(defaultFolder)) fs.mkdirSync(defaultFolder, { recursive: true });

/**
 * Función fábrica para configurar una instancia de Multer con almacenamiento en disco.
 * Permite personalizar el directorio de destino y la estrategia de nombrado de archivos.
 *
 * @module Middleware/createUpload
 * @param {Object} config - Objeto de configuración.
 * @param {string} [config.directory] - Ruta absoluta del directorio donde se guardarán los archivos. 
 *                                      Por defecto: `src/public/archives`.
 * @param {Function} [config.filename] - Función personalizada para nombrar el archivo `(req, file, cb)`.
 *
 * @description
 * Estrategia de nombrado por defecto (si no se provee una función `filename`):
 * 1. Busca si se especificó un nombre en `req.body.filename` o `req.query.filename`.
 * 2. Si existe, usa ese nombre base + timestamp + extensión original.
 * 3. Si no, usa el nombre original del archivo + timestamp + extensión.
 *
 * @returns {Object} Instancia de Multer configurada lista para usar como middleware.
 */
function createUpload({ directory = defaultFolder, filename: filenameFn } = {}) {
  if (!fs.existsSync(directory)) fs.mkdirSync(directory, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      // Si se pasa una función personalizada, usarla
      if (typeof filenameFn === 'function') {
        return filenameFn(req, file, cb);
      }

      // Lógica de nombrado por defecto
      const requested = (req && (req.body?.filename || req.query?.filename)) || null;
      const originalExt = path.extname(file.originalname);
      let baseName;

      if (requested) {
        const reqExt = path.extname(requested);
        baseName = path.basename(requested, reqExt).replace(/\s+/g, '-');
        const ext = reqExt || originalExt;
        cb(null, `${baseName}-${Date.now()}${ext}`);
      } else {
        baseName = path.basename(file.originalname, originalExt).replace(/\s+/g, '-');
        cb(null, `${baseName}-${Date.now()}${originalExt}`);
      }
    }
  });

  return multer({ storage });
}

/**
 * Middleware base de carga de archivos.
 *
 * @module Middleware/multer.upload
 * @type {Multer}
 *
 * @description
 * Este middleware es una instancia de Multer configurada con:
 * - Directorio por defecto: `src/public/archives`
 * - Estrategia de nombrado automática con timestamp
 *
 * Uso típico en rutas:
 * ```js
 * // Cargar un solo archivo
 * router.post('/subir', upload.single('archivo'), controlador);
 *
 * // Cargar varios archivos
 * router.post('/subir', upload.array('archivos', 5), controlador);
 *
 * // Cargar distintos campos
 * router.post('/subir', upload.fields([
 *   { name: 'foto', maxCount: 1 },
 *   { name: 'documentos', maxCount: 3 }
 * ]), controlador);
 * ```
 *
 * Para personalizar directorios o nombres:
 * ```js
 * import { createUpload } from './upload.js';
 * const customUpload = createUpload({
 *   directory: '/ruta/personalizada',
 *   filename: (req, file, cb) => {
 *     cb(null, 'custom-' + Date.now() + path.extname(file.originalname));
 *   }
 * });
 * ```
 */
const upload = createUpload();

export default upload;
export { createUpload };
