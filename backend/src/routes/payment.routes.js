const express = require('express');

const {
  createPayment,
  getMyPayments,
  approvePayment
} = require('../controllers/payment.controller');

const {
  protect,
  authorizeRoles
} = require('../middleware/auth.middleware');
const router = express.Router();

router.use(protect);

// إنشاء طلب دفع جديد
router.post('/', createPayment);

// جميع طلبات الدفع الخاصة بالمستخدم الحالي
router.get('/my-payments', getMyPayments);
router.patch(
  '/:id/approve',
  authorizeRoles('admin'),
  approvePayment
);
module.exports = router;