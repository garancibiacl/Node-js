const express = require("express");
const { reporter } = require("../middlewares/reporter");
const { listJoyas, filterJoyas } = require("../controllers/joyas.controller");

const router = express.Router();

// Reporte por ruta (requerimiento)
router.use(reporter);

router.get("/joyas", listJoyas);
router.get("/joyas/filtros", filterJoyas);

module.exports = { router };
