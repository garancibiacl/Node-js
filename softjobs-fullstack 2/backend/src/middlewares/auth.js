const { verifyToken } = require("../helpers/jwt");

// Valida JWT en Authorization: Bearer <token>
module.exports = (req, res, next) => {
  const auth = req.header("Authorization");

  if (!auth) {
    return res.status(401).json({ message: "Falta header Authorization" });
  }

  const [scheme, token] = auth.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Formato inválido. Usa: Bearer <token>" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // { email, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
