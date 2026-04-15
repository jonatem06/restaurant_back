const express = require('express');
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const { employeeValidator } = require('../utils/validators');

const router = express.Router();

router.use(protect);
router.use(authorize('gerente'));

router.route('/')
  .post(employeeValidator, createEmployee)
  .get(getEmployees);

router.route('/:id')
  .put(updateEmployee)
  .delete(deleteEmployee);

module.exports = router;
