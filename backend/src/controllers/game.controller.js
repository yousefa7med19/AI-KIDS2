const Game = require('../models/Game');
const Child = require('../models/Child');

async function getGamesForChild(req, res, next) {
  try {
    const child = await Child.findOne({
      _id: req.params.childId,
      parent: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    const games = await Game.find({
      ageGroup: child.age,
      isPublished: true
    }).sort({
      rating: -1,
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      child: {
        id: child._id,
        name: child.name,
        age: child.age
      },
      count: games.length,
      games
    });
  } catch (error) {
    next(error);
  }
}

async function getGameById(req, res, next) {
  try {
    const child = await Child.findOne({
      _id: req.query.childId,
      parent: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    const game = await Game.findOne({
      _id: req.params.id,
      ageGroup: child.age,
      isPublished: true
    });

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found for this child'
      });
    }

    return res.status(200).json({
      success: true,
      child: {
        id: child._id,
        name: child.name,
        age: child.age
      },
      game
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getGamesForChild,
  getGameById
};