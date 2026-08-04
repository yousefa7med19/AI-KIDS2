const Child = require('../models/Child');
const Course = require('../models/Course');

const {
  getChildCourseProgress,
  saveProgress
} = require('../services/progress.service');

const {
  validateProgressInput
} = require('../validators/progress.validator');

async function verifyChildAndCourse(req, res) {
  const child = await Child.findOne({
    _id: req.params.childId,
    parent: req.user._id
  });

  if (!child) {
    res.status(404).json({
      success: false,
      message: 'Child not found'
    });

    return null;
  }

  const course = await Course.findOne({
    _id: req.params.courseId,
    ageGroup: child.age,
    isPublished: true
  });

  if (!course) {
    res.status(404).json({
      success: false,
      message: 'Course not found for this child'
    });

    return null;
  }

  return { child, course };
}

async function getProgress(req, res, next) {
  try {
    const verified = await verifyChildAndCourse(req, res);

    if (!verified) {
      return;
    }

    const progress = await getChildCourseProgress(
      req.params.childId,
      req.params.courseId
    );

    return res.status(200).json({
      success: true,
      progress: progress || null
    });
  } catch (error) {
    next(error);
  }
}

async function updateProgress(req, res, next) {
  try {
    const verified = await verifyChildAndCourse(req, res);

    if (!verified) {
      return;
    }

    const validationErrors = validateProgressInput(req.body);

    if (validationErrors.length) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
        errors: validationErrors
      });
    }

    const progressData = {
      completedLessons: req.body.completedLessons || [],
      completedQuizzes: req.body.completedQuizzes || [],
      progressPercentage: Number(
        req.body.progressPercentage || 0
      ),
      completed: req.body.completed === true
    };

    const progress = await saveProgress(
      req.params.childId,
      req.params.courseId,
      progressData
    );

    return res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      progress
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProgress,
  updateProgress
};