const Child = require('../models/Child');
const { addRewards } = require('../services/xp.service');

async function createChild(req, res, next) {
  try {
    const { name, age, avatar } = req.body;

    if (!name || !age) {
      return res.status(400).json({
        success: false,
        message: 'Child name and age are required'
      });
    }

    const numericAge = Number(age);

    if (numericAge < 7 || numericAge > 10) {
      return res.status(400).json({
        success: false,
        message: 'Child age must be between 7 and 10'
      });
    }

    const child = await Child.create({
      parent: req.user._id,
      name: name.trim(),
      age: numericAge,
      avatar: avatar || 'avatar-1'
    });

    return res.status(201).json({
      success: true,
      message: 'Child added successfully',
      child
    });
  } catch (error) {
    next(error);
  }
}

async function getChildren(req, res, next) {
  try {
    const children = await Child.find({
      parent: req.user._id
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: children.length,
      children
    });
  } catch (error) {
    next(error);
  }
}
async function getChild(req, res, next) {
  try {
    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    return res.status(200).json({
      success: true,
      child
    });

  } catch (error) {
    next(error);
  }
}
async function deleteChild(req, res, next) {
  try {
    const child = await Child.findOneAndDelete({
      _id: req.params.id,
      parent: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Child deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}
async function updateChild(req, res, next) {
  try {
    const { name, age, avatar } = req.body;

    const numericAge = Number(age);

    if (!name || !numericAge) {
      return res.status(400).json({
        success: false,
        message: 'Child name and age are required'
      });
    }

    if (numericAge < 7 || numericAge > 10) {
      return res.status(400).json({
        success: false,
        message: 'Child age must be between 7 and 10'
      });
    }

    const child = await Child.findOneAndUpdate(
      {
        _id: req.params.id,
        parent: req.user._id
      },
      {
        name: name.trim(),
        age: numericAge,
        avatar: avatar || 'avatar-1'
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Child updated successfully',
      child
    });
  } catch (error) {
    next(error);
  }
}
async function rewardChild(req, res, next) {
  try {
    const { xp, coins } = req.body;

    const child = await Child.findOne({
      _id: req.params.id,
      parent: req.user._id
    });

    if (!child) {
      return res.status(404).json({
        success: false,
        message: 'Child not found'
      });
    }

    const updatedChild = await addRewards(child, {
      xp,
      coins
    });

    return res.status(200).json({
      success: true,
      message: 'Rewards added successfully',
      child: updatedChild
    });
  } catch (error) {
    next(error);
  }
}   
module.exports = {
  createChild,
  getChildren,
  getChild,
  updateChild,
  deleteChild,
  rewardChild
};