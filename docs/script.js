const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
menu.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menu.setAttribute("aria-expanded",open?"true":"false");
});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded","false");
}));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("show")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const sections=[...document.querySelectorAll("main section[id]")];
const links=[...document.querySelectorAll(".nav-links a")];
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  document.querySelector(".progress").style.width=(max?scrollY/max*100:0)+"%";
  let current="home";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-180) current=s.id});
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});


// Appearance + accent preferences
const themeControls = document.querySelector(".theme-controls");
const appearanceTrigger = document.querySelector(".appearance-trigger");
const themeButtons = document.querySelectorAll(".theme-btn");
const accentButtons = document.querySelectorAll(".accent-btn");

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
const savedAccent = localStorage.getItem("portfolio-accent") || "violet";

document.body.dataset.theme = savedTheme;
document.body.dataset.accent = savedAccent;
themeButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.theme === savedTheme));
accentButtons.forEach(btn => btn.classList.toggle("active", btn.dataset.accent === savedAccent));

appearanceTrigger.addEventListener("click", e => {
  e.stopPropagation();
  const open = themeControls.classList.toggle("open");
  appearanceTrigger.setAttribute("aria-expanded", open ? "true" : "false");
});
document.addEventListener("click", e => {
  if (!themeControls.contains(e.target)) {
    themeControls.classList.remove("open");
    appearanceTrigger.setAttribute("aria-expanded","false");
  }
});
themeButtons.forEach(btn => btn.addEventListener("click", () => {
  const theme = btn.dataset.theme;
  document.body.dataset.theme = theme;
  localStorage.setItem("portfolio-theme", theme);
  themeButtons.forEach(b => b.classList.toggle("active", b === btn));
  themeControls.classList.remove("open");
  appearanceTrigger.setAttribute("aria-expanded","false");
}));
accentButtons.forEach(btn => btn.addEventListener("click", () => {
  const accent = btn.dataset.accent;
  document.body.dataset.accent = accent;
  localStorage.setItem("portfolio-accent", accent);
  accentButtons.forEach(b => b.classList.toggle("active", b === btn));
  themeControls.classList.remove("open");
  appearanceTrigger.setAttribute("aria-expanded","false");
}));

const galleryTrack = document.querySelector(".gallery-track");
const gallerySlides = [...document.querySelectorAll(".gallery-slide")];
const galleryCount = document.querySelector(".gallery-count");
const imageModal = document.querySelector(".image-modal");
const imageModalContent = imageModal.querySelector("img");
const imageModalClose = imageModal.querySelector(".image-modal-close");
let currentSlide = 0;

const showSlide = index => {
  currentSlide = (index + gallerySlides.length) % gallerySlides.length;
  galleryTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  galleryCount.textContent = `${currentSlide + 1} / ${gallerySlides.length}`;
};

document.querySelector(".gallery-prev").addEventListener("click", () => showSlide(currentSlide - 1));
document.querySelector(".gallery-next").addEventListener("click", () => showSlide(currentSlide + 1));
gallerySlides.forEach(slide => slide.addEventListener("click", () => {
  const image = slide.querySelector("img");
  imageModalContent.src = image.src;
  imageModalContent.alt = image.alt;
  imageModal.hidden = false;
  document.body.style.overflow = "hidden";
}));

const closeImageModal = () => {
  imageModal.hidden = true;
  document.body.style.overflow = "";
};

imageModalClose.addEventListener("click", closeImageModal);
imageModal.addEventListener("click", event => {
  if (event.target === imageModal) closeImageModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !imageModal.hidden) closeImageModal();
});
