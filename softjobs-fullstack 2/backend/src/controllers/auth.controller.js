const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/jwt");
const { findUserByEmail } = require("../models/usuarios.model");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "Credenciales inválidas" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(404).json({ message: "Credenciales inválidas" });
    }

    const token = signToken({ email: user.email });
    // IMPORTANTE: el cliente React del desafío agrega "Bearer" por su cuenta.
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = { login };
