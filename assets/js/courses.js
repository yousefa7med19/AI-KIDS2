
const ageButtons=[...document.querySelectorAll('[data-age]')];
const categoryButtons=[...document.querySelectorAll('[data-category]')];
const cards=[...document.querySelectorAll('.course-card')];
let selectedAge='all', selectedCategory='all';
function applyFilters(){let visible=0;cards.forEach(card=>{const ages=card.dataset.age.split(','),cats=card.dataset.category.split(',');const okAge=selectedAge==='all'||ages.includes(selectedAge);const okCat=selectedCategory==='all'||cats.includes(selectedCategory);card.hidden=!(okAge&&okCat);if(!card.hidden)visible++;});document.getElementById('empty-state').hidden=visible!==0;}
ageButtons.forEach(b=>b.addEventListener('click',()=>{ageButtons.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selectedAge=b.dataset.age;applyFilters();}));
categoryButtons.forEach(b=>b.addEventListener('click',()=>{categoryButtons.forEach(x=>x.classList.remove('selected'));b.classList.add('selected');selectedCategory=b.dataset.category;applyFilters();}));
document.getElementById('sort-courses').addEventListener('change',e=>{const grid=document.getElementById('course-grid');const sorted=[...cards].sort((a,b)=>e.target.value==='progress'?+b.dataset.progress-+a.dataset.progress:+b.dataset.popularity-+a.dataset.popularity);sorted.forEach(c=>grid.appendChild(c));});
const modal=document.getElementById('demo-modal'), title=document.getElementById('demo-title');
document.querySelectorAll('.demo-play').forEach(b=>b.addEventListener('click',()=>{title.textContent=`${b.dataset.demo} — Demo`;modal.hidden=false;document.body.style.overflow='hidden';}));
function closeModal(){modal.hidden=true;document.body.style.overflow='';}
document.querySelector('.demo-close').addEventListener('click',closeModal);document.querySelector('.demo-primary').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});
const toast=document.getElementById('course-toast');function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(window.courseToastTimer);window.courseToastTimer=setTimeout(()=>toast.classList.remove('show'),2600);}
document.querySelectorAll('.heart').forEach(b=>b.addEventListener('click',()=>{b.classList.toggle('saved');b.textContent=b.classList.contains('saved')?'♥':'♡';showToast(b.classList.contains('saved')?'Course saved to favorites.':'Course removed from favorites.');}));
document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>showToast('Demo course action only. Enrollment and progress will connect to the backend control panel.')));
document.querySelector('.course-menu').addEventListener('click',e=>{const nav=document.getElementById('course-nav');nav.classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',nav.classList.contains('open'));});
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});