import pool from "../../config/postgre.js";

export default async function actualizarCalificacion(data) {

  try {
    const result = await pool.query(
   `
        UPDATE reviews
        SET 
            rating = COALESCE($1, rating),
            review = COALESCE($2, review),
            platform_id = COALESCE($3, platform_id)
        WHERE user_id = $4 AND movie_id = $5
        RETURNING *;
    `,
    [
        data.rating || null,       // $1
        data.review || null,       // $2
        data.platform_id || null,  // $3
        userId,                    // $4
        movieId                    // $5
    ]);

    console.table(result.rows);
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}