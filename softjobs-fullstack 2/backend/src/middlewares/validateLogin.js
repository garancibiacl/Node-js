const isNonEmptyString = (v) => typeof v === "string" && v.trim().length > 0;

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    return res.status(400).json({ message: "Email y password obligatorias" });
  }

  next();
};
