const Sale = require('../models/Sale');
const { calculateFinance } = require('../services/financeService');

const getDashboardData = async (req, res, next) => {
  try {
    const finance = await calculateFinance();

    // Top selling products
    const sales = await Sale.find({}).populate('items.itemId');
    const productSales = {};
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (item.itemType === 'MenuItem') {
          const name = item.itemId.nombre;
          productSales[name] = (productSales[name] || 0) + item.cantidad;
        }
      });
    });

    const topProducts = Object.entries(productSales)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, cantidad]) => ({ nombre, cantidad }));

    // Weekly/Monthly Earnings (Simplified as recent sales for this dashboard)
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const weeklySales = await Sale.find({ fecha: { $gte: lastWeek } });
    const monthlySales = await Sale.find({ fecha: { $gte: lastMonth } });

    const weeklyEarnings = weeklySales.reduce((acc, curr) => acc + curr.total, 0);
    const monthlyEarnings = monthlySales.reduce((acc, curr) => acc + curr.total, 0);

    res.json({
      topProducts,
      weeklyEarnings,
      monthlyEarnings,
      puntoEquilibrio: finance
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardData };
