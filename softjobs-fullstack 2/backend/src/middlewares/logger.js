// Middleware para reportar consultas recibidas (requisito)
module.exports = (req, res, next) => {
  const started = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - started;
    console.log("[REQ]", {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration_ms: duration,
    });
  });

  next();
};
