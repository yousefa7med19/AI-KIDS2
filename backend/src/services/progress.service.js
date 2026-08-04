const Progress = require('../models/Progress');

async function getChildCourseProgress(childId, courseId) {
  return await Progress.findOne({
    child: childId,
    course: courseId
  });
}

async function saveProgress(
  childId,
  courseId,
  progressData
) {
  return await Progress.findOneAndUpdate(
    {
      child: childId,
      course: courseId
    },
    {
      ...progressData,
      lastOpenedAt: new Date()
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );
}

module.exports = {
  getChildCourseProgress,
  saveProgress
};