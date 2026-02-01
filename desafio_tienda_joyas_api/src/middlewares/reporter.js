const fs = require("fs");
const path = require("path");

const LOG_PATH = path.join(__dirname, "..", "..", "logs", "consultas.log");

const reporter = (req, _res, next) => {
  const payload = {
    at: new Date().toISOString(),
    method: req.method,
    route: req.originalUrl.split("?")[0],
    query: req.query,
  };

  fs.appendFile(LOG_PATH, JSON.stringify(payload) + "\n", (err) => {
    if (err) console.error("Error escribiendo log:", err);
  });

  next();
};

module.exports = { reporter };
