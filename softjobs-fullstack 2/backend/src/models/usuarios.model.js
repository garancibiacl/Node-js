const bcrypt = require("bcryptjs");
const { query } = require("../config/db");

const SALT_ROUNDS = 10;

const createUser = async ({ email, password, rol, lenguage }) => {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  const sql = `
    INSERT INTO usuarios (email, password, rol, lenguage)
    VALUES ($1, $2, $3, $4)
    RETURNING id, email, rol, lenguage
  `;
  const values = [email, hashed, rol || null, lenguage || null];

  const { rows } = await query(sql, values);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const sql = `SELECT * FROM usuarios WHERE email = $1`;
  const { rows } = await query(sql, [email]);
  return rows[0];
};

const getUserPublicByEmail = async (email) => {
  const sql = `SELECT email, rol, lenguage FROM usuarios WHERE email = $1`;
  const { rows } = await query(sql, [email]);
  return rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  getUserPublicByEmail,
};
