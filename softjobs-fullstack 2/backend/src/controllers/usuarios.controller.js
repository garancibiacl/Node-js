const { createUser, getUserPublicByEmail, findUserByEmail } = require("../models/usuarios.model");

const register = async (req, res, next) => {
  try {
    const { email, password, rol, lenguage } = req.body;

    // evitar duplicados
    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const user = await createUser({ email, password, rol, lenguage });

    res.status(201).json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { email } = req.user; // viene del token
    const user = await getUserPublicByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // El cliente React del desafío espera un array con el usuario en la primera posición.
    res.json([user]);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, getProfile };
