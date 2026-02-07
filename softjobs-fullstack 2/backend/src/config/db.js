const { Pool } = require("pg");

const rawConnectionString = process.env.DATABASE_URL;
const useSupabaseSsl = /supabase\.com/.test(rawConnectionString || "");

let connectionString = rawConnectionString;
if (useSupabaseSsl && rawConnectionString) {
  // Avoid sslmode from URL overriding Node TLS options in pg.
  const parsed = new URL(rawConnectionString);
  parsed.searchParams.delete("sslmode");
  connectionString = parsed.toString();
}

const pool = new Pool({
  connectionString,
  ...(useSupabaseSsl ? { ssl: { rejectUnauthorized: false } } : {}),
  // Si DATABASE_URL no existe, pg tomará PGHOST, PGUSER, PGPASSWORD, PGDATABASE, PGPORT.
});

// Wrapper para loguear consultas SQL (requisito: "reportar por la terminal las consultas")
const query = async (text, values) => {
  const started = Date.now();
  try {
    const res = await pool.query(text, values);
    const duration = Date.now() - started;
    console.log("[SQL]", { duration_ms: duration, rows: res.rowCount, text, values });
    return res;
  } catch (err) {
    const duration = Date.now() - started;
    console.log("[SQL_ERROR]", { duration_ms: duration, text, values, message: err.message });
    throw err;
  }
};

module.exports = { pool, query };
