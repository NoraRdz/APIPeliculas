import pool from '../../config/postgre.js'


export default async function agregarPeliculas(titulo,estreno,sinopsis) {

  try {
    const result = await pool.query(
     `INSERT INTO movies(title,release_year,sinopsis)
      VALUES($1, $2, $3)
        RETURNING *;`,
        [titulo, estreno,sinopsis]
    );

    // console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}