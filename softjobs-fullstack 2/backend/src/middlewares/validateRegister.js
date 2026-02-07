const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

module.exports = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({
      message: "Email y password obligatorias",
    });
  }

  // rol y lenguage vienen desde el formulario del cliente, pero pueden ser opcionales
  if (rol !== undefined && !isNonEmptyString(rol)) {
    return res.status(400).json({ message: "Rol no puede venir vacío" });
  }
  if (lenguage !== undefined && !isNonEmptyString(lenguage)) {
    return res.status(400).json({ message: "Lenguage no puede venir vacío" });
  }

  next();
};
