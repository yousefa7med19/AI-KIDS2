const express = require('express');

const {
  getGamesForChild,
  getGameById
} = require('../controllers/game.controller');

const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.get('/child/:childId', getGamesForChild);

router.get('/:id', getGameById);

module.exports = router;