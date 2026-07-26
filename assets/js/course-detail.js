
const menu=document.querySelector('.menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});
const modal=document.getElementById('modal'),title=document.getElementById('modal-title'),toast=document.getElementById('toast');
function openVideo(name){title.textContent=name;modal.hidden=false;document.body.style.overflow='hidden'}function closeVideo(){modal.hidden=true;document.body.style.overflow=''}
document.querySelector('.continue').addEventListener('click',()=>openVideo('Global Thinkers — Demo Course Video'));
document.querySelectorAll('[data-lesson]').forEach(b=>b.addEventListener('click',()=>openVideo(b.dataset.lesson+' — Demo Lesson')));
document.querySelector('.close').addEventListener('click',closeVideo);document.querySelector('.done').addEventListener('click',closeVideo);modal.addEventListener('click',e=>{if(e.target===modal)closeVideo()});
document.querySelector('.favorite').addEventListener('click',e=>{e.currentTarget.classList.toggle('saved');e.currentTarget.textContent=e.currentTarget.classList.contains('saved')?'♥':'♡';toast.textContent=e.currentTarget.classList.contains('saved')?'Course saved to favorites.':'Course removed from favorites.';toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)});
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.tab,.pane').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById(b.dataset.tab).classList.add('active')}));
