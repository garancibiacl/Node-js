const toHateoas = ({ total, stockTotal, rows }) => ({
  totalJoyas: total,
  stockTotal,
  results: rows.map((r) => ({
    name: r.nombre,
    href: `/joyas/joya/${r.id}`,
  })),
});

module.exports = { toHateoas };
