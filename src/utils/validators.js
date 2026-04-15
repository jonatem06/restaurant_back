const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const loginValidator = [
  body('username').notEmpty().withMessage('Username is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate
];

const employeeValidator = [
  body('nombres').notEmpty().withMessage('Nombres es requerido'),
  body('apellidoPaterno').notEmpty().withMessage('Apellido Paterno es requerido'),
  body('rfc').notEmpty().withMessage('RFC es requerido'),
  body('correo').isEmail().withMessage('Correo inválido'),
  body('username').isLength({ min: 4 }).withMessage('Username debe tener al menos 4 caracteres'),
  body('password').optional().isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres'),
  body('role').isIn(['vendedor', 'gerente', 'cocina']).withMessage('Rol inválido'),
  validate
];

const productValidator = [
  body('nombre').notEmpty().withMessage('Nombre es requerido'),
  body('precio').isNumeric().withMessage('Precio debe ser un número'),
  body('tipoUnidad').isIn(['kilo', 'pieza']).withMessage('Tipo de unidad inválido'),
  validate
];

const saleValidator = [
  body('items').isArray({ min: 1 }).withMessage('Debe haber al menos un item'),
  body('items.*.itemId').isMongoId().withMessage('ID de item inválido'),
  body('items.*.itemType').isIn(['MenuItem', 'Package']).withMessage('Tipo de item inválido'),
  body('items.*.cantidad').isNumeric().withMessage('Cantidad debe ser un número'),
  validate
];

module.exports = {
  loginValidator,
  employeeValidator,
  productValidator,
  saleValidator
};
