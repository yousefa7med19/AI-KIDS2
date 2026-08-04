const express = require('express');
const {
  createChild,
  getChildren,
  getChild,
  updateChild,
  deleteChild,
  rewardChild
} = require('../controllers/child.controller');

const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/', getChildren);
router.get('/:id', getChild);
router.post('/', createChild);
router.put('/:id', updateChild);
router.post('/:id/rewards', rewardChild);
router.delete('/:id', deleteChild);

module.exports = router;