const Expense = require('../models/Expense');
const Employee = require('../models/Employee');
const Sale = require('../models/Sale');
const MenuItem = require('../models/MenuItem');
const mongoose = require('mongoose');

const calculateFinance = async (startDate, endDate) => {
  const dateFilter = {};
  if (startDate || endDate) {
    dateFilter.fecha = {};
    if (startDate) dateFilter.fecha.$gte = new Date(startDate);
    if (endDate) dateFilter.fecha.$lte = new Date(endDate);
  }

  // 1. Costos Fijos (Sueldos + Gastos)
  const totalSueldosResult = await Employee.aggregate([
    { $group: { _id: null, total: { $sum: '$sueldo' } } }
  ]);
  const totalSueldos = totalSueldosResult.length > 0 ? totalSueldosResult[0].total : 0;

  const totalExpensesResult = await Expense.aggregate([
    { $match: dateFilter },
    { $group: { _id: null, total: { $sum: '$monto' } } }
  ]);
  const totalExpenses = totalExpensesResult.length > 0 ? totalExpensesResult[0].total : 0;

  const costosFijos = totalSueldos + totalExpenses;

  // 2. Ventas Totales y Ticket Promedio
  const salesStats = await Sale.aggregate([
    { $match: dateFilter },
    {
      $group: {
        _id: null,
        ventasTotales: { $sum: '$total' },
        numeroVentas: { $sum: 1 }
      }
    }
  ]);

  const ventasTotales = salesStats.length > 0 ? salesStats[0].ventasTotales : 0;
  const numeroVentas = salesStats.length > 0 ? salesStats[0].numeroVentas : 0;
  const ticketPromedio = numeroVentas > 0 ? ventasTotales / numeroVentas : 0;

  // 3. Margen Promedio
  // This is complex with aggregation because we need to join with MenuItem/Package to get margins.
  // For scalability, we'll aggregate items sold.
  const itemStats = await Sale.aggregate([
    { $match: dateFilter },
    { $unwind: '$items' },
    { $match: { 'items.itemType': 'MenuItem' } },
    {
      $group: {
        _id: '$items.itemId',
        cantidad: { $sum: '$items.cantidad' },
        revenue: { $sum: { $multiply: ['$items.cantidad', '$items.precioUnitario'] } }
      }
    }
  ]);

  let totalMarginContribution = 0;
  for (const stat of itemStats) {
    const menuItem = await MenuItem.findById(stat._id);
    if (menuItem) {
      const porcentajeProducto = ventasTotales > 0 ? stat.revenue / ventasTotales : 0;
      totalMarginContribution += menuItem.margen * porcentajeProducto;
    }
  }
  const margenPromedio = totalMarginContribution;

  // 4. Punto de Equilibrio
  const puntoEquilibrioVentas = margenPromedio > 0 ? costosFijos / margenPromedio : 0;
  const puntoEquilibrioDinero = puntoEquilibrioVentas * ticketPromedio;

  const diferencia = ventasTotales - puntoEquilibrioDinero;
  let estado = 'equilibrio';
  if (diferencia > 0) estado = 'ganancia';
  if (diferencia < 0) estado = 'perdida';

  return {
    gastosFijos: totalExpenses,
    sueldos: totalSueldos,
    costosFijos,
    ventasTotales,
    margenPromedio,
    puntoEquilibrioVentas,
    puntoEquilibrioDinero,
    ticketPromedio,
    diferencia,
    estado
  };
};

module.exports = { calculateFinance };
