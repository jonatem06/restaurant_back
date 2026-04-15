const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.employee || !roles.includes(req.employee.role)) {
      res.status(403);
      return next(new Error(`El rol ${req.employee ? req.employee.role : 'desconocido'} no tiene permiso para acceder a esta ruta`));
    }
    next();
  };
};

module.exports = { authorize };
