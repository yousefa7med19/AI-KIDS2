
const cards = [...document.querySelectorAll('.game-card')], filters = [...document.querySelectorAll('.filters button')], search = document.getElementById('search'), sort = document.getElementById('sort'), grid = document.getElementById('grid'), load = document.getElementById('load'), modal = document.getElementById('modal'), title = document.getElementById('game-title'), toast = document.getElementById('toast'); let active = 'All', limit = 8;
function msg(t) { toast.textContent = t; toast.classList.add('show'); clearTimeout(window.tt); window.tt = setTimeout(() => toast.classList.remove('show'), 2200) }
function render() { let list = cards.filter(c => (active === 'All' || c.dataset.category === active) && (!search.value || c.dataset.name.includes(search.value.toLowerCase()))); if (sort.value === 'name') list.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name)); if (sort.value === 'rating') list.sort((a, b) => +b.dataset.rating - +a.dataset.rating); if (sort.value === 'popular') list.sort((a, b) => +a.dataset.order - +b.dataset.order); cards.forEach(c => c.classList.remove('visible')); list.slice(0, limit).forEach(c => { c.classList.add('visible'); grid.appendChild(c) }); load.hidden = list.length <= limit }
filters.forEach(b => b.onclick = () => { filters.forEach(x => x.classList.remove('active')); b.classList.add('active'); active = b.dataset.filter; limit = 8; render() }); search.oninput = () => { limit = 8; render() }; sort.onchange = render; load.onclick = () => { limit += 4; render() };
document.querySelectorAll('.heart').forEach(b => b.onclick = () => { b.classList.toggle('saved'); b.textContent = b.classList.contains('saved') ? '♥' : '♡'; msg(b.classList.contains('saved') ? 'Game added to favorites.' : 'Game removed from favorites.') });
function openGame(n) { title.textContent = n + ' — Demo'; modal.hidden = false; document.body.style.overflow = 'hidden' } function closeGame() { modal.hidden = true; document.body.style.overflow = '' }
document.querySelectorAll('.play').forEach(b => b.onclick = () => openGame(b.dataset.game)); document.querySelector('.close').onclick = closeGame; document.querySelector('.start').onclick = () => { document.getElementById('coins').textContent = +document.getElementById('coins').textContent + 10; closeGame(); msg('Demo completed! +10 coins.') }; modal.onclick = e => { if (e.target === modal) closeGame() };
document.getElementById('bonus').onclick = () => { document.getElementById('coins').textContent = 140; document.getElementById('earned').textContent = 140; msg('Daily bonus claimed: +20 coins!') };
const menu = document.querySelector('.menu'), nav = document.getElementById('nav'); menu.onclick = () => nav.classList.toggle('open'); render();
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const filtersContainer = document.getElementById("gameFilters");
    const filterButtons = document.querySelectorAll(".filter-btn");

    if (!filtersContainer || filterButtons.length === 0) {
        return;
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            // إزالة active من الزر القديم
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
                item.setAttribute("aria-pressed", "false");
            });

            // إضافة active للزر المضغوط
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            // تحريك القائمة حتى يظهر الزر في المنتصف
            button.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center"
            });

            const selectedFilter = button.dataset.filter;

            console.log("Selected category:", selectedFilter);
        });
    });
});