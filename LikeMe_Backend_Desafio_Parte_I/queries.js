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

const likePost = async (id) => {
  const { rows } = await pool.query(
    "UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *;",
    [id]
  );
  return rows[0];
};

const deletePost = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM posts WHERE id = $1 RETURNING *;",
    [id]
  );
  return rows[0];
};

module.exports = { getPosts, createPost, likePost, deletePost };
