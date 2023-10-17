document.addEventListener("DOMContentLoaded", () => {
  // Получаем доступ к элементам на странице
  const pages = document.querySelectorAll(".quiz__page"); // Все страницы
  const pageButtons = document.querySelectorAll(".quiz__sidebar-link"); // Кнопки в сайдбаре
  const finishButton = document.getElementById("page3-finish"); // Кнопка "Завершить"
  const sidebarAnswerElements = document.querySelectorAll(
    ".quiz__sidebar-link-answer"
  ); // Элементы для ответов в сайдбаре

  let changesMade = false; // Флаг для отслеживания изменений
  let currentPageIndex = 0; // Индекс текущей страницы

  // Функция для скрытия кнопок в сайдбаре после текущей страницы
  function hideButtonsAfterCurrentPage() {
    for (let i = currentPageIndex + 1; i < pageButtons.length; i++) {
      pageButtons[i].style.display = "none";
    }
  }

  // Функция для обновления текущей страницы
  function updatePage(index) {
    // Скрываем текущую страницу и обновляем индекс
    pages[currentPageIndex].style.display = "none";
    currentPageIndex = index;
    pages[currentPageIndex].style.display = "block";

    // Отображаем текущую кнопку в сайдбаре и скрываем лишние
    pageButtons[index].style.display = "block";
    hideButtonsAfterCurrentPage();

    // Дизейблим кнопку "Завершить" если нет изменений
    finishButton.disabled = !changesMade;

    // Удаляем класс с чёрным фоном у всех кнопок в сайдбаре
    pageButtons.forEach((button) => {
      button.classList.remove("quiz-active");
    });

    // Добавляем класс с чёрным фоном только к текущей кнопке
    pageButtons[currentPageIndex].classList.add("quiz-active");
  }

  // Функция для обработки нажатия кнопки "Назад"
  function handleBackButton() {
    if (currentPageIndex > 0) {
      updatePage(currentPageIndex - 1);
    }
  }

  // Первую кнопку в сайдбаре делаем видимой при загрузке
  pageButtons[0].style.display = "block";
  pageButtons[0].classList.add("quiz-active");

  // Назначаем обработчики событий на кнопки в сайдбаре
  pageButtons.forEach((button, index) => {
    // Обновляем текст кнопки в сайдбаре
    pageButtons[index].querySelector(".quiz__sidebar-link-head").textContent =
      pages[index].querySelector(".quiz__page-title").textContent;

    button.addEventListener("click", (event) => {
      event.preventDefault();
      updatePage(index); // Обновляем текущую страницу
    });
  });

  // Назначаем обработчики событий на кнопки "Продолжить" и "Назад"
  const continueButtons = document.querySelectorAll('[id$="-continue"]');
  const backButton2 = document.getElementById("page2-back");
  const backButton3 = document.getElementById("page3-back");

  continueButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (currentPageIndex < pages.length - 1) {
        updatePage(currentPageIndex + 1); // Переходим на следующую страницу
      }
    });
  });

  backButton2.addEventListener("click", handleBackButton); // Назад с 2 страницы
  backButton3.addEventListener("click", handleBackButton); // Назад с 3 страницы

  // Функция для обновления содержимого в сайдбаре
  function updateSidebarAnswer(index, text) {
    sidebarAnswerElements[index].textContent = text;
  }

  // Функция для обновления выбранных чекбоксов в сайдбаре
  function updateSelectedCheckboxes() {
    const selectedCheckboxes = document.querySelectorAll(
      ".checkboxes input:checked"
    );
    const labelTexts = Array.from(selectedCheckboxes).map(
      (cb) => cb.nextElementSibling.textContent
    );
    updateSidebarAnswer(0, labelTexts.join(", "));
  }

  // Назначаем обработчики событий на чекбоксы
  document.querySelectorAll(".checkboxes input").forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      changesMade = true; // Есть изменения
      finishButton.disabled = false; // Дизейблим кнопку
      updateSelectedCheckboxes(); // Обновляем содержимое в сайдбаре
    });
  });

  // Функция для обновления содержимого выбранной радио кнопки в сайдбаре
  function updateRadioContent() {
    const selectedRadio = document.querySelector(".radio__label-input:checked");
    const radioText = selectedRadio
      ? selectedRadio.parentElement.textContent.trim()
      : "";
    updateSidebarAnswer(1, radioText);
  }

  // Назначаем обработчики событий на радио кнопки
  document.querySelectorAll(".radio__label-input").forEach((radio) => {
    radio.addEventListener("change", () => {
      changesMade = true; // Есть изменения
      finishButton.disabled = false; // Дизейблим кнопку
      updateRadioContent(); // Обновляем содержимое в сайдбаре
    });
  });

  // Получаем элементы для ввода текста
  const opinionInput = document.querySelector(".quiz__page-opinion-input");
  const opinionChoice = document.querySelector(".quiz__page-opinion-choice");
  const choiceInput = document.getElementById("choice");

  // Функция для обработки изменений в полях ввода
  function handleChange() {
    changesMade = true; // Есть изменения
    finishButton.disabled = false; // Дизейблим кнопку
  }

  opinionInput.addEventListener("input", handleChange); // Изменения в поле мнения
  opinionChoice.addEventListener("change", handleChange); // Изменения в выборе мнения
  choiceInput.addEventListener("input", handleChange); // Изменения в поле ввода

  finishButton.addEventListener("click", () => {
    if (changesMade) {
      // Получаем выбранные чекбоксы и радио кнопку
      const selectedCheckboxes = document.querySelectorAll(
        ".checkboxes input:checked"
      );
      const selectedRadio = document.querySelector(
        ".radio__label-input:checked"
      );
      const radioText = selectedRadio
        ? selectedRadio.parentElement.textContent.trim()
        : "";

      // Получаем значения из полей ввода
      const opinion = document.getElementById("opinion");
      const choice = document.getElementById("choice");

      // Создаем объект с результатами
      const quizResults = {
        checkboxes: Array.from(selectedCheckboxes).map(
          (checkbox) => checkbox.nextElementSibling.textContent
        ),
        radio: radioText,
        opinion: opinion.value,
        choice: choice.value,
      };

      // Сбрасываем состояния
      selectedCheckboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });

      if (selectedRadio) {
        selectedRadio.checked = false;
      }

      opinion.value = "";
      choice.value = choice.options[0].value;

      console.log(quizResults); // Выводим результат в консоль

      // Сброс флага изменений и дизейблинг кнопки "Завершить"
      changesMade = false;
      finishButton.disabled = true;

      // Очищаем ответы в сайдбаре
      sidebarAnswerElements.forEach((element) => (element.textContent = ""));
    }
  });
});
