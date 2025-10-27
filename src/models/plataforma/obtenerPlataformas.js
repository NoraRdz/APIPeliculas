import pool from "../../config/postgre.js"

export default async function obtenerCatalogoPeliculas(id) {
     console.log(id)
  let consultSql;
  if(id == undefined){
    consultSql='SELECT * FROM platforms'
  }
  else{
    consultSql=`SELECT * FROM platforms WHERE id=${id}`
  }

//   console.log(consultSql)

  try {
    const result = await pool.query(consultSql);

    console.table(result.rows); // Muestra los usuarios en la consola
    return result.rows;
  } catch (err) {
    console.error(err);
    return "Error en el servidor";
  }
}