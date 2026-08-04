const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

const params = new URLSearchParams(window.location.search);

const gameId = params.get('gameId');
const childId = params.get('childId');

if (!gameId || !childId) {
  window.location.href = 'games.html';
}

function getGameIcon(category) {
  const icons = {
    'AI Basics': '🤖',
    Creativity: '🎨',
    'Logic & Thinking': '🧩',
    Coding: '💻',
    Quizzes: '🧠'
  };

  return icons[category] || '🎮';
}

function formatAgeGroup(ageGroup) {
  if (!Array.isArray(ageGroup) || !ageGroup.length) {
    return 'Ages 7–10';
  }

  const sortedAges = [...ageGroup].sort((a, b) => a - b);
  const firstAge = sortedAges[0];
  const lastAge = sortedAges[sortedAges.length - 1];

  if (firstAge === lastAge) {
    return `Age ${firstAge}`;
  }

  return `Ages ${firstAge}–${lastAge}`;
}

async function loadGame() {
  try {
    const data = await apiRequest(
      `/games/${gameId}?childId=${childId}`
    );

    const game = data.game;

    document.title = `AI Kids — ${game.title}`;

    document.getElementById('game-title').textContent =
      game.title;

    document.getElementById('game-description').textContent =
      game.description;

    document.getElementById('game-goal').textContent =
      game.description;

    document.getElementById('game-icon').textContent =
      getGameIcon(game.category);

    document.getElementById('game-category').textContent =
      game.category;

    document.getElementById('game-difficulty').textContent =
      game.difficulty;

    document.getElementById('game-rating').textContent =
      `⭐ ${game.rating || 0}`;

    document.getElementById('game-age').textContent =
      formatAgeGroup(game.ageGroup);

    document.getElementById('game-xp').textContent =
      `⭐ ${game.xpReward || 0} XP`;

    document.getElementById('game-coins').textContent =
      `🪙 ${game.coinReward || 0} Coins`;

    document.getElementById('back-to-games').href =
      `games.html?childId=${childId}`;
  } catch (error) {
    console.error('Unable to load game:', error);

    if (
      error.message === 'Invalid or expired token' ||
      error.message === 'You must be logged in'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');

      window.location.href = 'login.html';
      return;
    }

    alert(error.message || 'Unable to load game');

    window.location.href =
      `games.html?childId=${childId}`;
  }
}

const startGameButton = document.getElementById(
  'start-game-button'
);

startGameButton.addEventListener('click', () => {
  const statusElement = document.getElementById('game-status');

  statusElement.textContent =
    '🎮 This game will be available soon.';

  startGameButton.textContent = 'Coming Soon';
  startGameButton.disabled = true;
});

loadGame();