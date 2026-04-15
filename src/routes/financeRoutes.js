const express = require('express');
const { getBreakEvenPoint, getGrossProfit, getNetProfit } = require('../controllers/financeController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);
router.use(authorize('gerente'));

router.get('/punto-equilibrio', getBreakEvenPoint);
router.get('/ganancias/bruta', getGrossProfit);
router.get('/ganancias/neta', getNetProfit);

module.exports = router;
