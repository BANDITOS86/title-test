document.addEventListener("DOMContentLoaded", () => {
  new Swiper(".review__swiper", {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 4,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 3.5,
      },
      900: {
        slidesPerView: 3.2,
      },
      760: {
        slidesPerView: 2.5,
      },
      576: {
        slidesPerView: 2.1,
      },
      450: {
        slidesPerView: 1.5,
      },
      320: {
        slidesPerView: 1.14,
      },
    },
  });

  Fancybox.bind("[data-fancybox]", {});

  document.querySelectorAll(".form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      Fancybox.close();
      Fancybox.show([
        {
          src: "#dialog-success",
          type: "inline",
        },
      ]);
    });
  });
});
