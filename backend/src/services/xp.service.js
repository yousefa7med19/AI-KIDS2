function calculateLevel(xp) {
  if (xp >= 900) return 5;
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;

  return 1;
}

async function addRewards(child, { xp = 0, coins = 0 }) {
  child.xp += Number(xp) || 0;
  child.coins += Number(coins) || 0;
  child.level = calculateLevel(child.xp);

  await child.save();

  return child;
}

module.exports = {
  calculateLevel,
  addRewards
};