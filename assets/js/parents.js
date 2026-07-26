
const modal=document.getElementById('dashboard-modal');
const dashboardButton=document.getElementById('dashboard-preview-button');
const languageButton=document.getElementById('language-button');
const languageMenu=document.getElementById('language-menu');
const toast=document.getElementById('parents-toast');

function showToast(message){
  toast.textContent=message;
  toast.classList.add('show');
  clearTimeout(window.parentsToastTimer);
  window.parentsToastTimer=setTimeout(()=>toast.classList.remove('show'),2300);
}
function openDashboard(){
  modal.hidden=false;
  document.body.style.overflow='hidden';
}
function closeDashboard(){
  modal.hidden=true;
  document.body.style.overflow='';
}
dashboardButton.addEventListener('click',openDashboard);
document.querySelector('.modal-close').addEventListener('click',closeDashboard);
modal.addEventListener('click',event=>{if(event.target===modal)closeDashboard()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal.hidden)closeDashboard()});

languageButton.addEventListener('click',()=>{
  languageMenu.hidden=!languageMenu.hidden;
});
document.querySelectorAll('[data-language]').forEach(button=>{
  button.addEventListener('click',()=>{
    languageButton.textContent=`🌐 ${button.dataset.language}⌄`;
    languageMenu.hidden=true;
    showToast(button.dataset.language==='AR'?'Arabic interface placeholder selected.':'English interface selected.');
  });
});
document.addEventListener('click',event=>{
  if(!languageButton.contains(event.target)&&!languageMenu.contains(event.target)){
    languageMenu.hidden=true;
  }
});

const menu=document.querySelector('.menu-toggle');
const nav=document.getElementById('main-nav');
menu.addEventListener('click',()=>{
  nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(nav.classList.contains('open')));
});
const backToTop = document.getElementById("backToTop");

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});