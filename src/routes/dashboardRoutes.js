const express = require('express');
const { getDashboardData } = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/', protect, authorize('gerente'), getDashboardData);

module.exports = router;
