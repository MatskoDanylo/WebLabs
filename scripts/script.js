document.addEventListener('DOMContentLoaded', function() {
  function toggleMenu() {
    const nav = document.querySelector(".header-line nav");
    nav.classList.toggle("active");
  }

  // Assign the toggleMenu function to the menu icon click event
  const menuIcon = document.querySelector(".menu-icon");
  menuIcon.addEventListener("click", toggleMenu);
});
