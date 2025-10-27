import pool from '../../config/postgre.js'

export default async function extraerUsuarios() {

  try {
    const result = await pool.query(
        'select * from users'
    );

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}