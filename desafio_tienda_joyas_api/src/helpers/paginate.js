const paginate = ({ limits = 10, page = 1 }) => {
  const limitNum = Math.max(1, Number(limits) || 10);
  const pageNum = Math.max(1, Number(page) || 1);
  const offset = (pageNum - 1) * limitNum;
  return { limit: limitNum, page: pageNum, offset };
};

module.exports = { paginate };
