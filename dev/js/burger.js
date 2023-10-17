document.addEventListener("DOMContentLoaded", () => {
  const burgerMenuButton = document.querySelector("[data-burger]"),
    burgerMenu = document.querySelector("[data-burger-menu]"),
    documentBody = document.querySelector(".page__body"),
    closeItemList = burgerMenu.querySelectorAll("[data-close-item]"),
    navLinkList = burgerMenu.querySelectorAll(".nav__link");

  function openBurgerMenu() {
    burgerMenuButton.classList.add("burger_active");
    burgerMenu.classList.add("nav_burger-active");
    documentBody.classList.add("disable-scroll");
  }

  function closeBurgerMenu() {
    burgerMenuButton.classList.remove("burger_active");
    burgerMenu.classList.remove("nav_burger-active");
    documentBody.classList.remove("disable-scroll");
  }

  burgerMenuButton.addEventListener("click", () => {
    if (burgerMenu.classList.contains("nav_burger-active")) {
      closeBurgerMenu();
    } else {
      openBurgerMenu();
    }
  });

  closeItemList.forEach((item) => {
    item.addEventListener("click", () => {
      closeBurgerMenu();
      Fancybox.close();
    });
  });

  navLinkList.forEach((item) => {
    item.addEventListener("click", () => {
      closeBurgerMenu();
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.keyCode == 27) {
      closeBurgerMenu();
    }
  });
});
