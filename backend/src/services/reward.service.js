const { addRewards } = require('./xp.service');

async function completeLesson(child) {
  return await addRewards(child, {
    xp: 20,
    coins: 5
  });
}

async function completeQuiz(child) {
  return await addRewards(child, {
    xp: 50,
    coins: 15
  });
}

async function completeCourse(child) {
  return await addRewards(child, {
    xp: 100,
    coins: 30
  });
}

module.exports = {
  completeLesson,
  completeQuiz,
  completeCourse
};