// Middleware de manejo de errores (requisito: capturar y devolver errores)
module.exports = (err, req, res, next) => {
  const candidateStatus = err.status || err.statusCode;
  const status = Number.isInteger(candidateStatus) ? candidateStatus : 500;

  // Evitamos filtrar detalles sensibles; dejamos un mensaje claro.
  const message =
    err.publicMessage ||
    err.message ||
    "Error interno del servidor";

  // Log interno (sí, aquí sí queremos el stack)
  console.error("[ERROR]", {
    method: req.method,
    url: req.originalUrl,
    status,
    message: err.message,
  });

  res.status(status).json({ message });
};
