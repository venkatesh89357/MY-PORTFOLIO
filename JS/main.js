/* main.js */
document.addEventListener('DOMContentLoaded', () => {
  /* Smooth scrolling for anchors */
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

  /* Mobile nav toggling if present */
  const toggle = document.querySelector('#nav-toggle');
  if(toggle) toggle.addEventListener('click', ()=>{
    const menu = document.querySelector('#nav-menu');
    if(menu) menu.classList.toggle('open');
  });
});
