import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER||process.env.PGUSER,
  host: process.env.DB_HOST||process.env.PGHOST,
  database: process.env.DB_NAME||process.env.PGDATABASE,
  password: process.env.DB_PASSWORD||process.env.PGPASSWORD,
  port: process.env.DB_PORT||process.env.PGPORT, // Puerto por defecto de PostgreSQL
  ssl: {
    rejectUnauthorized: false
  }
});



const createTables = async () => {
  try {
    await pool.query(`
          -- Tabla users
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username VARCHAR(100),
          email VARCHAR(100),
          password VARCHAR(255)
      );

      -- Tabla platforms
      CREATE TABLE IF NOT EXISTS platforms (
          id SERIAL PRIMARY KEY,
          p_name VARCHAR(100)
      );

      -- Tabla genre
      CREATE TABLE IF NOT EXISTS genre (
          id SERIAL PRIMARY KEY,
          nombre VARCHAR(100)
      );

      -- Tabla movies
      CREATE TABLE IF NOT EXISTS movies (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255),
          release_year INTEGER,
          sinopsis TEXT
      );

      -- Tabla movie_genre (relación muchos a muchos)
      CREATE TABLE IF NOT EXISTS movie_genre (
          movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
          genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE,
          PRIMARY KEY (movie_id, genre_id)
      );

      -- Tabla platform_movie (relación muchos a muchos)
      CREATE TABLE IF NOT EXISTS platform_movie (
          platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
          movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
          available_since DATE,
          PRIMARY KEY (platform_id, movie_id)
      );

      -- Tabla rating
      CREATE TABLE IF NOT EXISTS rating (
          id SERIAL PRIMARY KEY,
          user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
          movie_id INTEGER REFERENCES movies(id) ON DELETE CASCADE,
          platform_id INTEGER REFERENCES platforms(id) ON DELETE CASCADE,
          rating DOUBLE PRECISION,
          review TEXT,
          created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

    `);
    console.log("Tablas creadas correctamente");
  } catch (err) {
    console.error("Error creando tablas:", err);
  }
};

export {pool,createTables};