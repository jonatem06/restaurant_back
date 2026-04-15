const { calculateFinance } = require('../services/financeService');
const Sale = require('../models/Sale');

const getBreakEvenPoint = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const data = await calculateFinance(startDate, endDate);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getGrossProfit = async (req, res, next) => {
  try {
    const sales = await Sale.find({}).populate('items.itemId');
    let grossProfit = 0;
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (item.itemType === 'MenuItem') {
          grossProfit += item.itemId.margen * item.cantidad;
        }
      });
    });
    res.json({ grossProfit });
  } catch (error) {
    next(error);
  }
};

const getNetProfit = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const finance = await calculateFinance(startDate, endDate);
    // Net profit = Total Sales - Cost of Goods Sold - Fixed Costs
    // Total Sales - COGS is roughly the sum of margins (Gross Profit)
    const sales = await Sale.find({}).populate('items.itemId');
    let grossProfit = 0;
    sales.forEach(sale => {
      sale.items.forEach(item => {
        if (item.itemType === 'MenuItem') {
          grossProfit += item.itemId.margen * item.cantidad;
        }
      });
    });
    const netProfit = grossProfit - finance.costosFijos;
    res.json({ netProfit });
  } catch (error) {
    next(error);
  }
};

module.exports = { getBreakEvenPoint, getGrossProfit, getNetProfit };
