const cards = [...document.querySelectorAll('.game-card')];
const filters = [...document.querySelectorAll('.filters button')];

const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const gamesGrid = document.getElementById('grid');
const loadMoreButton = document.getElementById('load');

const toast = document.getElementById('toast');
const menuButton = document.querySelector('.menu');
const navigation = document.getElementById('nav');
const backToTopButton = document.getElementById('backToTop');

const coinsElement = document.getElementById('coins');
const earnedCoinsElement = document.getElementById('earned');
const bonusButton = document.getElementById('bonus');

let activeFilter = 'All';
let visibleLimit = 8;
let toastTimer;

/*
  الطفل الحالي يُمرّر في الرابط بالشكل:
  games.html?childId=CHILD_ID
*/
const pageParams = new URLSearchParams(window.location.search);
const childId = pageParams.get('childId');

/* =========================
   Toast Message
========================= */

function showMessage(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* =========================
   Search, Filter and Sort
========================= */

function getFilteredGames() {
  const searchValue = searchInput
    ? searchInput.value.trim().toLowerCase()
    : '';

  const filteredGames = cards.filter((card) => {
    const matchesCategory =
      activeFilter === 'All' ||
      card.dataset.category === activeFilter;

    const matchesSearch =
      !searchValue ||
      card.dataset.name.includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  if (!sortSelect) {
    return filteredGames;
  }

  if (sortSelect.value === 'name') {
    filteredGames.sort((firstCard, secondCard) => {
      return firstCard.dataset.name.localeCompare(
        secondCard.dataset.name
      );
    });
  }

  if (sortSelect.value === 'rating') {
    filteredGames.sort((firstCard, secondCard) => {
      return (
        Number(secondCard.dataset.rating) -
        Number(firstCard.dataset.rating)
      );
    });
  }

  if (sortSelect.value === 'popular') {
    filteredGames.sort((firstCard, secondCard) => {
      return (
        Number(firstCard.dataset.order) -
        Number(secondCard.dataset.order)
      );
    });
  }

  return filteredGames;
}

function renderGames() {
  if (!gamesGrid) return;

  const filteredGames = getFilteredGames();

  cards.forEach((card) => {
    card.classList.remove('visible');
  });

  filteredGames
    .slice(0, visibleLimit)
    .forEach((card) => {
      card.classList.add('visible');
      gamesGrid.appendChild(card);
    });

  if (loadMoreButton) {
    loadMoreButton.hidden =
      filteredGames.length <= visibleLimit;
  }
}

/* =========================
   Filter Buttons
========================= */

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((filterButton) => {
      filterButton.classList.remove('active');
      filterButton.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    activeFilter = button.dataset.filter;
    visibleLimit = 8;

    button.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    renderGames();
  });
});

/* =========================
   Search and Sort
========================= */

if (searchInput) {
  searchInput.addEventListener('input', () => {
    visibleLimit = 8;
    renderGames();
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', renderGames);
}

if (loadMoreButton) {
  loadMoreButton.addEventListener('click', () => {
    visibleLimit += 4;
    renderGames();
  });
}

/* =========================
   Favorite Buttons
========================= */

document.querySelectorAll('.heart').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();

    button.classList.toggle('saved');

    const isSaved = button.classList.contains('saved');

    button.textContent = isSaved ? '♥' : '♡';

    showMessage(
      isSaved
        ? 'Game added to favorites.'
        : 'Game removed from favorites.'
    );
  });
});

/* =========================
   Open Game Details
========================= */

function openGameDetails(playButton) {
  /*
    gameId لازم يكون MongoDB ID حقيقي.

    مثال داخل games.html:
    data-game-id="66abc123..."
  */
  const gameId = playButton.dataset.gameId;
  const gameName =
    playButton.dataset.game || 'This game';

  if (!childId) {
    showMessage(
      'Open Games from the child dashboard first.'
    );

    return;
  }

  if (!gameId) {
    showMessage(
      `${gameName} will be available when games are uploaded.`
    );

    return;
  }

  window.location.href =
    `game-details.html?gameId=${encodeURIComponent(gameId)}` +
    `&childId=${encodeURIComponent(childId)}`;
}

document.querySelectorAll('.play').forEach((button) => {
  button.addEventListener('click', () => {
    openGameDetails(button);
  });
});

/* =========================
   Daily Bonus Demo
========================= */

if (bonusButton) {
  bonusButton.addEventListener('click', () => {
    const currentCoins = Number(
      coinsElement?.textContent || 0
    );

    const newCoins = currentCoins + 20;

    if (coinsElement) {
      coinsElement.textContent = newCoins;
    }

    if (earnedCoinsElement) {
      earnedCoinsElement.textContent = newCoins;
    }

    showMessage('Daily bonus claimed: +20 coins!');
  });
}

/* =========================
   Mobile Menu
========================= */

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
  });
}

/* =========================
   Back To Top
========================= */

if (backToTopButton) {
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* =========================
   Initial Render
========================= */

renderGames();