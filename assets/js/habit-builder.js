
const habitCards=[...document.querySelectorAll('.habit-card')];
const completedCount=document.getElementById('completed-count');
const completedBar=document.getElementById('completed-bar');
const pointsValue=document.getElementById('points-value');
const coinCount=document.getElementById('coin-count');
const toast=document.getElementById('habit-toast');
const modal=document.getElementById('custom-modal');
const customForm=document.getElementById('custom-form');

function showToast(message){
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(window.habitToastTimer);
  window.habitToastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
}

function updateSummary(){
  const complete=habitCards.filter(card=>card.dataset.complete==='true').length;
  completedCount.textContent=complete;
  completedBar.style.width=`${Math.min(100,(complete/habitCards.length)*100)}%`;
  if(complete===habitCards.length){
    showToast('Amazing! All daily habits are complete. +50 bonus points!');
  }
}

habitCards.forEach(card=>{
  const button=card.querySelector('.habit-check');
  button.addEventListener('click',()=>{
    const wasComplete=card.dataset.complete==='true';
    card.dataset.complete=String(!wasComplete);
    button.classList.toggle('done',!wasComplete);
    button.textContent=!wasComplete?'✓':'';
    const delta=!wasComplete?10:-10;
    pointsValue.textContent=String(Math.max(0,Number(pointsValue.textContent)+delta));
    coinCount.textContent=String(Math.max(0,Number(coinCount.textContent)+delta));
    showToast(!wasComplete?'Habit completed! +10 coins.':'Habit marked incomplete.');
    updateSummary();
  });
});

document.getElementById('customize-button').addEventListener('click',()=>{
  modal.hidden=false;
  document.body.style.overflow='hidden';
});
function closeModal(){
  modal.hidden=true;
  document.body.style.overflow='';
  customForm.reset();
}
document.querySelector('.modal-close').addEventListener('click',closeModal);
modal.addEventListener('click',event=>{if(event.target===modal)closeModal()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)closeModal()});

customForm.addEventListener('submit',event=>{
  event.preventDefault();
  const title=document.getElementById('custom-title').value.trim();
  closeModal();
  showToast(`${title} added for this demo. Backend saving will be connected later.`);
});

document.getElementById('view-badges').addEventListener('click',()=>{
  showToast('Full badge history will be loaded from the backend dashboard.');
});

const menu=document.querySelector('.menu-toggle');
const nav=document.getElementById('main-nav');
menu.addEventListener('click',()=>{
  nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(nav.classList.contains('open')));
});
updateSummary();
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});