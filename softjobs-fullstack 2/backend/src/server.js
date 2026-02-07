require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./routes/index.routes");
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Soft Jobs API" });
});

app.use(routes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SERVER ON http://localhost:${PORT}`));
