function toggleMenu() {
  const navMenu = document.querySelector(".header-line nav");
  const menuIcon = document.querySelector(".menu-icon");
  document.body.classList.toggle("no-scroll"); // Вимикаємо скролл, коли меню відкрите
  navMenu.classList.toggle("active");
  menuIcon.classList.toggle("open"); // Додаємо стиль для хрестика
}
