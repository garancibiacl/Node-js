const { pool } = require("./db");

const getPosts = async () => {
  const { rows } = await pool.query("SELECT * FROM posts ORDER BY id DESC;");
  return rows;
};

const createPost = async ({ titulo, url, descripcion }) => {
  const query = `
    INSERT INTO posts (titulo, img, descripcion, likes)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [titulo, url, descripcion, 0];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Suma 1 like al post por id
const likePost = async (id) => {
  const query = `
    UPDATE posts
    SET likes = COALESCE(likes, 0) + 1
    WHERE id = $1
    RETURNING *;
  `;
  const { rows, rowCount } = await pool.query(query, [id]);

  // Si no se modificó ninguna fila, el recurso no existe -> 404
  if (rowCount === 0) throw { code: 404, message: "Post no encontrado" };

  return rows[0];
};

// Elimina post por id
const deletePost = async (id) => {
  const query = "DELETE FROM posts WHERE id = $1 RETURNING *;";
  const { rowCount } = await pool.query(query, [id]);

  if (rowCount === 0) throw { code: 404, message: "Post no encontrado" };

  return true;
};

module.exports = { getPosts, createPost, likePost, deletePost };
