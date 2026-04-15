const Sale = require('../models/Sale');
const MenuItem = require('../models/MenuItem');
const Package = require('../models/Package');

const createSale = async (req, res, next) => {
  try {
    const { items } = req.body;
    let total = 0;
    const processedItems = [];

    for (const item of items) {
      let dbItem;
      if (item.itemType === 'MenuItem') {
        dbItem = await MenuItem.findById(item.itemId);
      } else if (item.itemType === 'Package') {
        dbItem = await Package.findById(item.itemId);
      }

      if (!dbItem) {
        res.status(404);
        throw new Error(`Item ${item.itemId} no encontrado`);
      }

      const precioUnitario = dbItem.precio;
      total += precioUnitario * item.cantidad;

      processedItems.push({
        itemId: item.itemId,
        itemType: item.itemType,
        cantidad: item.cantidad,
        precioUnitario: precioUnitario
      });
    }

    const sale = await Sale.create({
      items: processedItems,
      total,
      vendedorId: req.employee._id,
      estado: 'pendiente'
    });

    if (req.app.get('socketio')) {
      req.app.get('socketio').to('kitchen').emit('nueva_orden', sale);
    }

    res.status(201).json(sale);
  } catch (error) {
    next(error);
  }
};

const getSales = async (req, res, next) => {
  try {
    const sales = await Sale.find({}).populate('vendedorId', 'nombres apellidoPaterno');
    res.json(sales);
  } catch (error) {
    next(error);
  }
};

const updateSaleStatus = async (req, res, next) => {
  try {
    const { estado } = req.body;
    const sale = await Sale.findByIdAndUpdate(req.params.id, { estado }, { new: true });
    if (!sale) {
      res.status(404);
      throw new Error('Venta no encontrada');
    }

    if (req.app.get('socketio')) {
      req.app.get('socketio').to('kitchen').emit('actualizar_estado', sale);
    }

    res.json(sale);
  } catch (error) {
    next(error);
  }
};

module.exports = { createSale, getSales, updateSaleStatus };
