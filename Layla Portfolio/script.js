document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     MOBILE NAV SYSTEM
  ====================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-links");
  const overlay = document.querySelector(".nav-overlay");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-links a");

  const openMenu = () => {
    navMenu.classList.add("open");
    menuToggle.classList.add("active");
    overlay.classList.add("show");
    body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    navMenu.classList.remove("open");
    menuToggle.classList.remove("active");
    overlay.classList.remove("show");
    body.style.overflow = "";
  };

  menuToggle.addEventListener("click", () => {
    navMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  /* =====================
     SWIPE TO CLOSE (MOBILE)
  ====================== */

  let startX = 0;

  navMenu.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  navMenu.addEventListener("touchmove", e => {
    const diff = e.touches[0].clientX - startX;
    if (diff < -60) closeMenu();
  });

  /* =====================
     HEADER SCROLL EFFECT
  ====================== */

  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  });

  /* =====================
     TYPEWRITER EFFECT
  ====================== */

  const words = [
    "Rutendo",
    "Layla",
    "a Student",
    "a Leader"
  ];

  const target = document.getElementById("typewriter");
  let i = 0, j = 0, deleting = false;

  function typeEffect() {
    if (!target) return;
    const word = words[i];

    if (!deleting) {
      target.textContent = word.slice(0, ++j);
      if (j === word.length) setTimeout(() => deleting = true, 1400);
    } else {
      target.textContent = word.slice(0, --j);
      if (j === 0) {
        deleting = false;
        i = (i + 1) % words.length;
      }
    }

    setTimeout(typeEffect, deleting ? 45 : 90);
  }

  typeEffect();

});
