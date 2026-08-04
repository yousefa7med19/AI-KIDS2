const Course = require('../models/Course');
const Child = require('../models/Child');

async function getCoursesForChild(req, res, next) {
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

    const courses = await Course.find({
      ageGroup: child.age,
      isPublished: true
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      child: {
        name: child.name,
        age: child.age
      },
      count: courses.length,
      courses
    });

  } catch (error) {
    next(error);
  }
}

async function getCourseById(req, res, next) {
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

    const course = await Course.findOne({
      _id: req.params.id,
      ageGroup: child.age,
      isPublished: true
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found for this child'
      });
    }

    return res.status(200).json({
      success: true,
      child: {
        id: child._id,
        name: child.name,
        age: child.age
      },
      course
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCoursesForChild,
  getCourseById
};