const { Router } = require("express");
const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");
const auth = require("../middlewares/auth");

const { register, getProfile } = require("../controllers/usuarios.controller");
const { login } = require("../controllers/auth.controller");

const router = Router();

// Registro
router.post("/usuarios", validateRegister, register);

// Login
router.post("/login", validateLogin, login);

// Perfil (requiere token)
router.get("/usuarios", auth, getProfile);

module.exports = router;
