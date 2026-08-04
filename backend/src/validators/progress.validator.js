function validateProgressInput({
  completedLessons,
  completedQuizzes,
  progressPercentage,
  completed
}) {
  const errors = [];

  if (
    completedLessons !== undefined &&
    !Array.isArray(completedLessons)
  ) {
    errors.push('Completed lessons must be an array');
  }

  if (
    completedQuizzes !== undefined &&
    !Array.isArray(completedQuizzes)
  ) {
    errors.push('Completed quizzes must be an array');
  }

  if (progressPercentage !== undefined) {
    const percentage = Number(progressPercentage);

    if (
      Number.isNaN(percentage) ||
      percentage < 0 ||
      percentage > 100
    ) {
      errors.push(
        'Progress percentage must be between 0 and 100'
      );
    }
  }

  if (
    completed !== undefined &&
    typeof completed !== 'boolean'
  ) {
    errors.push('Completed must be true or false');
  }

  return errors;
}

module.exports = {
  validateProgressInput
};