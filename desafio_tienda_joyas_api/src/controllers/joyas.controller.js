const { paginate } = require("../helpers/paginate");
const { toHateoas } = require("../helpers/hateoas");
const { getJoyasStats, getJoyas, getJoyasByFilters } = require("../models/joyas.model");

const ORDER_FIELDS = new Set(["id", "nombre", "categoria", "metal", "precio", "stock"]);
const ORDER_DIR = new Set(["ASC", "DESC"]);

const parseOrderBy = (order_by) => {
  if (!order_by || typeof order_by !== "string") return "id ASC";

  const [fieldRaw, dirRaw] = order_by.split("_");
  const field = (fieldRaw || "").toLowerCase();
  const dir = (dirRaw || "").toUpperCase();

  if (!ORDER_FIELDS.has(field) || !ORDER_DIR.has(dir)) return "id ASC";
  return `${field} ${dir}`;
};

const listJoyas = async (req, res) => {
  try {
    const limits = req.query.limits ?? req.query.limit; // soporta ambos
    const page = req.query.page;
    const order_by = req.query.order_by;

    const { limit, offset } = paginate({ limits, page });
    const orderBySql = parseOrderBy(order_by);

    const [stats, rows] = await Promise.all([
      getJoyasStats(),
      getJoyas({ limit, offset, orderBySql }),
    ]);

    return res.json(toHateoas({ total: stats.total, stockTotal: stats.stockTotal, rows }));
  } catch (error) {
    console.error("GET /joyas:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const filterJoyas = async (req, res) => {
  try {
    const { precio_min, precio_max, categoria, metal } = req.query;

    const rows = await getJoyasByFilters({
      precio_min: precio_min === "" ? undefined : precio_min,
      precio_max: precio_max === "" ? undefined : precio_max,
      categoria: categoria === "" ? undefined : categoria,
      metal: metal === "" ? undefined : metal,
    });

    return res.json(rows);
  } catch (error) {
    console.error("GET /joyas/filtros:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { listJoyas, filterJoyas };
