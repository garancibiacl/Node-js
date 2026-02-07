require('dotenv').config();

// Seed mínimo para facilitar pruebas del desafío
// Crea un usuario: test@softjobs.com / 123456

const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');

async function main() {
  const email = 'test@softjobs.com';
  const password = '123456';
  const rol = 'Full Stack Developer';
  const lenguage = 'JavaScript';

  const hashed = await bcrypt.hash(password, 10);

  await pool.query(
    `INSERT INTO usuarios (email, password, rol, lenguage)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (email) DO UPDATE SET
       password = EXCLUDED.password,
       rol = EXCLUDED.rol,
       lenguage = EXCLUDED.lenguage`,
    [email, hashed, rol, lenguage]
  );

  console.log('Seed OK:', { email, password });
  process.exit(0);
}

main().catch((e) => {
  console.error('Seed FAIL:', e);
  process.exit(1);
});
