const { pool } = require("../db");

const getJoyasStats = async () => {
  const query =
    "SELECT COUNT(*)::int AS total, COALESCE(SUM(stock),0)::int AS stock_total FROM inventario;";
  const { rows } = await pool.query(query);
  return { total: rows[0].total, stockTotal: rows[0].stock_total };
};

const getJoyas = async ({ limit, offset, orderBySql }) => {
  const query = `
    SELECT id, nombre, categoria, metal, precio, stock
    FROM inventario
    ORDER BY ${orderBySql}
    LIMIT $1 OFFSET $2;
  `;
  const values = [limit, offset];
  const { rows } = await pool.query(query, values);
  return rows;
};

const getJoyasByFilters = async ({ precio_min, precio_max, categoria, metal }) => {
  const conditions = [];
  const values = [];

  const add = (sql, value) => {
    values.push(value);
    conditions.push(sql.replace("$$", `$${values.length}`));
  };

  if (precio_min !== undefined) add("precio >= $$", Number(precio_min));
  if (precio_max !== undefined) add("precio <= $$", Number(precio_max));
  if (categoria) add("categoria = $$", String(categoria));
  if (metal) add("metal = $$", String(metal));

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  const query = `
    SELECT id, nombre, categoria, metal, precio, stock
    FROM inventario
    ${where}
    ORDER BY id ASC;
  `;

  const { rows } = await pool.query(query, values);
  return rows;
};

module.exports = { getJoyasStats, getJoyas, getJoyasByFilters };
